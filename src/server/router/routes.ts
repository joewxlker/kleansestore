import { MailDataRequired } from "@sendgrid/mail";
import { createRouter } from "./context";
import { string, z } from 'zod';
import * as bcrypt from "bcrypt";
import { saltRounds } from "../api's/all";

export const mongoDbRouter = createRouter()

  .mutation('login', {
    input: z.object({
      email: z.string(),
      password: z.string(),
    }),
    async resolve({ ctx, input }) {

      //email , password
      await ctx.mongo.connect();

      try {
        const login = await ctx.mongo.db('onlinestore').collection('user_data').findOne({ email: input.email });
        await ctx.mongo.close();
        if (login === null) return { result: false }
        //queries db for matching email and returns false if none found

        const compare = await bcrypt.compare(input.password, login.password);
        if (!compare) return { result: false }
        // compares hash stored in db with users password input
        return { result: true }
        // return true, nextauth handles signin
      }
      catch (err) {
        await ctx.mongo.close();
        return { result: false }
      }
    }
  })

  .mutation('add-maillist', {
    input: z.object({
      email: z.string(),
    }),
    async resolve({ ctx, input }) {
      await ctx.mongo.connect();
      const exists = await ctx.mongo.db('onlinestore').collection('mail_list').findOne({ email: input.email });
      const res = exists !== null ? null : await ctx.mongo.db('onlinestore').collection('mail_list').insertOne({ email: input.email });
      await ctx.mongo.close();
      if (res === null) return { result: 'EMAIL_EXISTS' };
      return { result: 'ADDED_MAILLIST' };
    }
  })

  .mutation('sign-up', {
    input: z.object({
      firstname: z.string(),
      lastname: z.string(),
      email: z.string(),
      password: z.string(),
      day: z.string(),
      month: z.string(),
      year: z.string(),
    }),

    async resolve({ ctx, input }) {

      await ctx.mongo.connect();
      //establish mongo db connection

      const login = await ctx.mongo.db('onlinestore').collection('user_data').findOne({ email: input.email });
      // login querries db for document containing query - { email : input.email }
      await ctx.mongo.close();
      if (login !== null) return { result: 'ACCOUNT_EXISTS' }
      // login = mongo db documument |  null
      const createHash = async (password: string) => {
        const hashed = await bcrypt.hash(password, saltRounds)
        return hashed;
      }

      const hash = await createHash(input.password);
      const mongouser = ({ ...input, ['password']: hash, cart: [] });
      await ctx.mongo.db('onlinestore').collection('user_data').insertOne(mongouser);
      // inserts new user to DB
      await ctx.stripe.customers.create({ email: input.email });
      await ctx.mongo.close();
      // creates stripe customer account using input email
      // await ctx.sendgrid.send(
      //   {
      //     to: process.env.OWNER!,
      //     from: process.env.EMAIL!,
      //     subject: ` New customer contact email sent from ${input.email}`,
      //     text: `hello, Sent from Kleanse Website`
      //     //TODO create Validation Email
      //   })
      // sends verification/welcome email to new user once they have successfully made an account

      return { result: 'SUCCESS' }

    }
  })

  .mutation('mongo-carts', {

    input: z.object({
      email: z.string(),
      item: z.array(z.object({
        image: z.string(),
        default_price: string(),
        quantity: z.number(),
        name: z.string(),
        amount: z.number(),
      })),
    }),

    async resolve({ ctx, input }) {
      await ctx.mongo.connect();
      const user = await ctx.mongo.db('onlinestore').collection('user_data').findOne({ email: input.email });
      if (user !== null) {
        const res = await ctx.mongo.db('onlinestore').collection('user_data').updateOne({ email: input.email }, { $set: { cart: input.item } });
        console.log(res)
        return true
      }
      await ctx.mongo.close();
    }
  })

  .query('mongo-carts', {
    input: z.object({
      email: z.string()
    }),
    async resolve({ ctx, input }) {
      await ctx.mongo.connect();
      const cart: any = await ctx.mongo.db('onlinestore').collection('user_data').findOne({ email: input.email });
      await ctx.mongo.close();
      console.log(cart)
      return cart.cart
    }
  })

export const stripeRouter = createRouter()

  .query('all-products', {
    async resolve({ ctx }) {
      const product = await ctx.stripe.products.list();
      const price = await ctx.stripe.prices.list();
      const productData = product.data.map((x, index) => { return { ...x, ...price.data[index] } })
      // returns an array of new product obj which includes both product and price key/values
      return productData
    }
  })

  .mutation('create-checkout-session', {

    input: z.object({
      items: z.array(z.object({
        price: z.string(),
        quantity: z.number(),
      })),
      email: z.string().nullish(),
    }),

    async resolve({ ctx, input }) {

      console.log(input.email);
      const domainURL = process.env.DOMAIN;
      const session = await ctx.stripe.checkout.sessions.create({
        customer_email: input.email === null ? undefined : input.email,
        mode: 'payment',
        shipping_address_collection: { allowed_countries: ['AU'] },
        payment_method_types: ['afterpay_clearpay', 'card'],
        line_items: input.items,
        success_url: `${domainURL}/stripe/success.html?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${domainURL}/stripe/canceled.html`,
      })
      return { url: session.url };
      // creates stripe session on stripe servers
      // returns success/cancel once use makes or cancels a purchase 
      // the server will render this path
    }
  }
  )
  .query('session_id', {
    input: z.object({
      session_id: z.any()
    }),

    async resolve({ ctx, input }) {
      if (input.session_id === undefined) return;
      const session = await ctx.stripe.checkout.sessions.retrieve(input.session_id);
      return { result: { ...session.shipping_details } }
    }
  })

  .mutation('create-account', {
    input: z.object({
      email: z.string(),
    }),
    async resolve({ ctx, input }) {
      const user = await ctx.stripe.customers.create({
        email: input.email,
      });
      if (user !== null) return { result: true }
      return { result: false }
      // returns null if user exists
      // creates a stripe account from a supplied email. 
    }
  })

export const sendgridRouter = createRouter()
  .mutation('send-email', {

    input: z.object({
      firstname: z.string(),
      email: z.string(),
      message: z.string()
    }),

    async resolve({ ctx, input }) {

      ctx.sendgrid.setApiKey(process.env.SENDGRID_API_KEY!)

      try {
        const contact: MailDataRequired = {
          to: process.env.OWNER!,
          from: process.env.EMAIL!,
          subject: ` New customer contact email sent from ${input.email}`,
          text: `hello, ${ctx.req?.body.message} Sent from Kleanse Website`
        }
        //TODO add request params and conditional email templates
        await ctx.sendgrid.send(contact)
        return { result: true };
      } catch (err) {
        return { result: false }
      }
    }
  }
  )
