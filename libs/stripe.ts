import Stripe from "stripe";

interface CreateCheckoutParams {
  priceId: string;
  successUrl: string;
  cancelUrl: string;
  couponId?: string | null;
  clientReferenceId?: string;
  user?: {
    customerId?: string;
    email?: string;
  };
}

interface CreateCustomerPortalParams {
  customerId: string;
  returnUrl: string;
}

// This is used to create a Stripe Checkout for one-time payments. It's usually triggered with the <ButtonCheckout /> component. Webhooks are used to update the user's state in the database.
export const createCheckout = async ({
  user,
  clientReferenceId,
  successUrl,
  cancelUrl,
  priceId,
  couponId,
}: CreateCheckoutParams): Promise<string> => {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2023-08-16", // TODO: update this when Stripe updates their API
      typescript: true,
    });

    const userParam: {
      customer?: string;
      customer_creation?: "always";
      customer_email?: string;
    } = {};

    if (user?.customerId) {
      userParam.customer = user.customerId;
    } else {
      userParam.customer_creation = "always";

      if (user?.email) {
        userParam.customer_email = user.email;
      }
    }

    const stripeSession = await stripe.checkout.sessions.create({
      mode: "payment",
      ...userParam,
      allow_promotion_codes: true,
      invoice_creation: { enabled: true },
      tax_id_collection: { enabled: true },
      client_reference_id: clientReferenceId,
      payment_intent_data: { setup_future_usage: "on_session" },
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      discounts: couponId
        ? [
            {
              coupon: couponId,
            },
          ]
        : [],
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    return stripeSession.url;
  } catch (e) {
    console.error(e);
    return null;
  }
};

// This is used to create Customer Portal sessions, so users can manage their subscriptions (payment methods, cancel, etc..)
export const createCustomerPortal = async ({
  customerId,
  returnUrl,
}: CreateCustomerPortalParams): Promise<string> => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-08-16", // TODO: update this when Stripe updates their API
    typescript: true,
  });

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });

  return portalSession.url;
};

// This is used to get the uesr checkout session and populate the data so we get the planId the user subscribed to
export const findCheckoutSession = async (sessionId: string) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2023-08-16", // TODO: update this when Stripe updates their API
      typescript: true,
    });

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });

    return session;
  } catch (e) {
    console.error(e);
    return null;
  }
};
