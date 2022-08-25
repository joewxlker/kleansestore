import { MailDataRequired } from "@sendgrid/mail";
import { createRouter } from "./context";
import { z } from 'zod';
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
        if (login === null) return { result: false }
        //queries db for matching email and returns false if none found

        const compare = await bcrypt.compare(input.password, login.password);
        if (!compare) return { result: false }
        // compares hash stored in db with users password input

        return { result: true }
        // return true, nextauth handles signin
      }
      catch (err) {
        console.log(err);
        return { result: false }
      }
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
      if (login !== null) return { result: 'ACCOUNT_EXISTS' }
      // login = mongo db documument |  null
      const createHash = async (password: string) => {
        const hashed = await bcrypt.hash(password, saltRounds)
        return hashed;
      }

      const hash = await createHash(input.password);
      const mongouser = ({ ...input, ['password']: hash });
      await ctx.mongo.db('onlinestore').collection('user_data').insertOne(mongouser);
      // inserts new user to DB
      await ctx.stripe.customers.create({ email: input.email });
      // creates stripe customer account using input email
      await ctx.sendgrid.send(
        {
          to: process.env.OWNER!,
          from: process.env.EMAIL!,
          subject: ` New customer contact email sent from ${input.email}`,
          text: `hello, Sent from Kleanse Website`
          //TODO create Validation Email
        })
      // sends verification/welcome email to new user once they have successfully made an account

      return { result: 'SUCCESS' }

    }
  })
  .mutation('mongo-carts', {

    input: z.object({
      session: z.string(),
      item: z.object({
        image: z.string(),
        price: z.string(),
        quantity: z.number(),
      }),
    }),

    async resolve({ ctx, input }) {
      await ctx.mongo.connect();

      const exists = await ctx.mongo.db('online-store').collection('carts').findOne({ session: input.session });
      if (exists === null) {
        await ctx.mongo.db('online-store').collection('carts').insertOne({ session: input.session, cart: [input.item] })
        return true
      }
      // // queries db for active cart session, creates cart session if not

      // else {
      const filtered = exists.cart.filter((x: typeof input) => x.item.price === input.item.price);
      // checks if added item already exists
      if (filtered.length === 0) {
        // pushes new item into cart array
        // await ctx.mongo.db('online-store').collection('carts').updateOne({ session: input.session }, { $set: { cart: [...exists.cart, input.item] } })
        // console.log(await ctx.mongo.db('online-store').collection('carts').findOne({ session: input.session }))
        return true
      }
      // }
      return false

    }
  })

export const stripeRouter = createRouter()

  .query('all-products', {
    async resolve({ ctx }) {
      const getProducts = async () => {
        const product = await ctx.stripe.products.list();
        const price = await ctx.stripe.prices.list();
        const productData = product.data.map((x, index) => { return { ...x, ...price.data[index] } })
        // returns an array of new product obj which includes both product and price key/values
        return productData
      }
      const products = await getProducts();
      return products;
    }
  })

  .query('create-checkout-session', {

    async resolve({ ctx }) {
      const domainURL = process.env.DOMAIN;
      const session = await ctx.stripe.checkout.sessions.create({
        mode: 'payment',
        line_items: ctx.req?.body.items,
        success_url: `${domainURL}/success.html?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${domainURL}/canceled.html`,
      })
      return { url: session.url };
      // creates stripe session on stripe servers
      // returns success/cancel once use makes or cancels a purchase 
      // the server will render this path
    }
  }
  )

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
        return true;
      } catch (err) {
        return { result: false }
      }
    }
  }
  )
