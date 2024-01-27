"use server";

import Stripe from "stripe";

export const findCustomerAndSubscription = async (email: string) => {
  let subscription;

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2023-08-16",
      typescript: true,
    });

    const customer = await stripe.customers.list({ email, limit: 1 });

    if (customer?.data[0]?.id) {
      subscription = await stripe.subscriptions.list({
        customer: customer?.data[0]?.id,
        limit: 1,
      });
    }

    return {
      customer: customer?.data[0] ?? null,
      subscription: subscription?.data[0] ?? null,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
