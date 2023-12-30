import { SupabaseClient } from "@supabase/supabase-js";
import { headers } from "next/headers";
import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

import { TrialEndTemplate } from "@/components/email/templates/trial-end";

import { sendEmail } from "@/libs/resend";
import { createCustomerPortal, findCheckoutSession } from "@/libs/stripe";

import configFile from "@/config";

const environment = process.env.NODE_ENV; // 'development' ou 'production'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-08-16",
  typescript: true,
});
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

// This is where we receive Stripe webhook events
// It used to update the user data, send emails, etc...
// By default, it'll store the user in the database
// See more: https://shipfa.st/docs/features/payments
export async function POST(req: NextRequest) {
  const body = await req.text();
  const bodyParsed = JSON.parse(body);

  const signature = headers().get("stripe-signature");

  let eventType;
  let event;

  // Create a private supabase client using the secret service_role API key
  const supabase = new SupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const events: { [key: string]: string } = {
    "customer.subscription.trial_will_end":
      "customer.subscription.trial_will_end",
  };

  // Verify Stripe event is legit
  try {
    if (events[bodyParsed.type]) {
      event = bodyParsed;
    } else {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    }
  } catch (err) {
    console.error(`Webhook signature verification failed. ${err.message}`);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  eventType = event.type;

  try {
    switch (eventType) {
      case "checkout.session.completed": {
        // First payment is successful and a subscription is created (if mode was set to "subscription" in ButtonCheckout)
        // ✅ Grant access to the product
        const stripeObject: Stripe.Checkout.Session = event.data
          .object as Stripe.Checkout.Session;

        const session = await findCheckoutSession(stripeObject.id);

        const customerId = session?.customer;
        const priceId = session?.line_items?.data[0]?.price.id;
        const userId = stripeObject.client_reference_id;
        const plan = configFile.stripe.plans.find((p) => p.priceId === priceId);

        if (!plan) break;

        // Update the profile where id equals the userId (in table called 'profiles') and update the customer_id, price_id, and has_access (provisioning)
        await supabase
          .from("profiles")
          .update({
            customer_id: customerId,
            price_id: priceId,
            has_access: true,
          })
          .eq("id", userId);

        // Extra: send email with user link, product page, etc...
        // try {
        //   await sendEmail(...);
        // } catch (e) {
        //   console.error("Email issue:" + e?.message);
        // }

        break;
      }

      case "checkout.session.expired": {
        // User didn't complete the transaction
        // You don't need to do anything here, by you can send an email to the user to remind him to complete the transaction, for instance
        break;
      }

      case "customer.subscription.updated": {
        // The customer might have changed the plan (higher or lower plan, cancel soon etc...)
        // You don't need to do anything here, because Stripe will let us know when the subscription is canceled for good (at the end of the billing cycle) in the "customer.subscription.deleted" event
        // You can update the user data to show a "Cancel soon" badge for instance
        break;
      }

      case "customer.subscription.deleted": {
        // The customer subscription stopped
        // ❌ Revoke access to the product
        const stripeObject: Stripe.Subscription = event.data
          .object as Stripe.Subscription;
        const subscription = await stripe.subscriptions.retrieve(
          stripeObject.id
        );

        await supabase
          .from("profiles")
          .update({ has_access: false })
          .eq("customer_id", subscription.customer);
        break;
      }

      case "invoice.paid": {
        // Customer just paid an invoice (for instance, a recurring payment for a subscription)
        // ✅ Grant access to the product
        const stripeObject: Stripe.Invoice = event.data
          .object as Stripe.Invoice;
        const priceId = stripeObject.lines.data[0].price.id;
        const customerId = stripeObject.customer;

        // Find profile where customer_id equals the customerId (in table called 'profiles')
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("customer_id", customerId)
          .single();

        // Make sure the invoice is for the same plan (priceId) the user subscribed to
        if (profile.price_id !== priceId) break;

        // Grant the profile access to your product. It's a boolean in the database, but could be a number of credits, etc...
        await supabase
          .from("profiles")
          .update({ has_access: true })
          .eq("customer_id", customerId);

        break;
      }

      case "invoice.payment_failed": {
        // A payment failed (for instance the customer does not have a valid payment method)
        // ❌ Revoke access to the product
        // ⏳ OR wait for the customer to pay (more friendly):
        //      - Stripe will automatically email the customer (Smart Retries)
        //      - We will receive a "customer.subscription.deleted" when all retries were made and the subscription has expired

        break;
      }

      case "customer.subscription.trial_will_end": {
        const stripeObject: Stripe.Subscription = event.data
          .object as Stripe.Subscription;

        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("customer_id", stripeObject.customer)
          .single()
          .throwOnError();

        if (profileError || !profile) {
          console.error("No profile found or error fetching profile", {
            profileError,
            profile,
          });
          return NextResponse.json(
            { error: "Profile not found or error fetching profile" },
            { status: 404 }
          );
        }

        if (profile.price_id !== stripeObject.items.data[0].price.id) {
          console.error("Price ID doesn't match", { profile, stripeObject });
          return NextResponse.json(
            { error: "Price ID doesn't match" },
            { status: 400 }
          );
        }

        const {
          data: { user },
          error: userError,
        } = await supabase.auth.admin.getUserById(profile.id);

        if (userError || !user) {
          console.error("No user found or error fetching user", {
            profileError,
            profile,
          });
          return NextResponse.json(
            { error: "Profile not found or error fetching user" },
            { status: 404 }
          );
        }

        const returnUrl =
          environment === "development"
            ? "http://localhost:3000/home"
            : "https://gopump.co/home";

        const manageSubscriptionUrl = await createCustomerPortal({
          customerId: profile.customer_id,
          returnUrl,
        });

        await sendEmail({
          to: profile.email,
          subject: "Seu período de teste está prestes a terminar",
          content: TrialEndTemplate({
            userName: user.user_metadata.name,
            trialEndDate: new Date(
              stripeObject.trial_end * 1000
            ).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            }),
            manageSubscriptionUrl,
          }),
        });

        break;
      }

      case "setup_intent.succeeded": {
        const stripeObject: Stripe.SetupIntent = event.data
          .object as Stripe.SetupIntent;

        await supabase
          .from("profiles")
          .update({ has_access: true })
          .eq("customer_id", stripeObject.customer);

        break;
      }

      default:
        console.log(`Unhandled event type ${eventType}`, {
          event: JSON.stringify(event),
        });
        break;
      // Unhandled event type
    }
  } catch (e) {
    console.error("stripe error: ", e.message);
  }

  return NextResponse.json({});
}
