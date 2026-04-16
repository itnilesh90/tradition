import Stripe from "stripe";

const stripeSecret = process.env.STRIPE_SECRET_KEY || "";

const stripe = stripeSecret ? new Stripe(stripeSecret) : null;

export default stripe;
