require("dotenv").config();
import * as Stripe from "stripe";
import * as sgMail from "@sendgrid/mail";

export const bcrypt = require("bcrypt");
export const saltRounds = 10;
// salt rounds used to create hash @bcrypt

declare global {
  var StripeApi: Stripe.default;
  var sendGrid: sgMail.MailService;
}

export const stripe: Stripe.default = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});
export const sendgrid: sgMail.MailService = sgMail;

// declare all api globals
