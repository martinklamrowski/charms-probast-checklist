import { z } from "zod";

import {
  createTRPCRouter, protectedProcedure,
} from "~/server/api/trpc";


import Stripe from "stripe";
import { env } from "~/env.mjs";

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-10-28.acacia"
})

export const checkoutRouter = createTRPCRouter({

  // This one needs to be protected, because when we checkout, ... didn't get it
  createCheckout: protectedProcedure.mutation(async ({ ctx }) => {

    const session = await stripe.checkout.sessions.create({
      // payment_method_types: ["card"],
      metadata: {
        userId: ctx.session.user.id
      },
      line_items: [
        {
          price: env.PRICE_ID,
          quantity: 1
        },
      ],
      mode: "payment",
      success_url: `${env.HOST_NAME}/paymentsuccess`,
      cancel_url: `${env.HOST_NAME}/paymentfail`
    });
    return session;
  }),
});
