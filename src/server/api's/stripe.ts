require('dotenv').config();
import * as Stripe from 'stripe'

declare global {
    var StripeApi: Stripe.default;
}

export const stripe: Stripe.default = require('stripe')(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2022-08-01',
});