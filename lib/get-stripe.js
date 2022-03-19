import { loadStripe } from "@stripe/stripe-js";

// Initialize for one-time a Stripe Instance
let stripeInstance = null;

const getStripe = () => {
  if (!stripeInstance) {
    stripeInstance = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);
  }
  return stripeInstance;
};

export default getStripe;
