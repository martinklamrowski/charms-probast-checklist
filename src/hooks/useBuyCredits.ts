import { loadStripe } from "@stripe/stripe-js";
import { env } from "~/env.mjs";
import { api } from "~/utils/api";


const stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_KEY);


// Little helper hook that we can use anywhere to
//  basically allow users to setup a session and
//  redirect to it
export function useBuyCredits() {
  const checkout = api.checkout.createCheckout.useMutation();

  return {
    // This hook, when you call the buy credits function, it's
    //  going to invoke that backend then get the session
    buyCredits: async () => {
      const response = await checkout.mutateAsync();
      const stripe = await stripePromise;

      await stripe?.redirectToCheckout({
        sessionId: response.id
      });
    }
  }
}