/* eslint-disable @typescript-eslint/no-var-requires */
require("dotenv").config();
import * as Stripe from "stripe";
import * as sgMail from "@sendgrid/mail";
import * as mongoDB from "mongodb";
import { MongoClient } from "mongodb";
// salt rounds used to create hash @bcrypt

declare global {
  const StripeApi: Stripe.default;
  const sendGrid: sgMail.MailService;
  const Mongo: mongoDB.MongoClient;
}

export const bcrypt = require('bcrypt')
export const saltRounds = 10;
export const stripe: Stripe.default = require("stripe")(process.env.STRIPE_SECRET_KEY, {apiVersion: "2022-08-01",});
export const sendgrid: sgMail.MailService = sgMail;
export const mongo: mongoDB.MongoClient = new MongoClient(process.env.MONGO_CLIENT_KEY ?? 'mongodb://api-key-not-found');