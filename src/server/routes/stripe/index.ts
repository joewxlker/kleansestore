import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createRouter } from "../../router/context";

export default createRouter()
  .middleware(async ({next}) => {
    if (!process.env.SENDGRID_API_KEY) {
      throw new TRPCError({code: "INTERNAL_SERVER_ERROR"})
    }
    return next();
  })
  .query("all-products", {
    async resolve({ ctx }) {
      const product = await ctx.stripe.products.list();
      const price = await ctx.stripe.prices.list();
      const productData = product.data.map((x, index) => {
        return { ...x, ...price.data[index] };
      });
      // returns an array of new product obj which includes both product and price key/values
      return productData;
    },
  })
  .mutation("create-checkout-session", {
    input: z.object({
      items: z.array(
        z.object({
          price: z.string(),
          quantity: z.number(),
        }),
      ),
      email: z.string().nullish(),
    }),
    async resolve({ ctx, input }) {
      console.log(input.email);
      const domainURL = process.env.DOMAIN;
      const session = await ctx.stripe.checkout.sessions.create({
        customer_email: input.email === null ? undefined : input.email,
        mode: "payment",
        shipping_address_collection: { allowed_countries: ["AU"] },
        payment_method_types: ["afterpay_clearpay", "card"],
        line_items: input.items,
        success_url: `${domainURL}/stripe/success.html?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${domainURL}/stripe/canceled.html`,
      });
      return { url: session.url };
      // creates stripe session on stripe servers
      // returns success/cancel once use makes or cancels a purchase
      // the server will render this path
    },
  })
  .query("session_id", {
    input: z.object({
      session_id: z.any(),
    }),

    async resolve({ ctx, input }) {
      if (input.session_id === undefined) return;
      const session = await ctx.stripe.checkout.sessions.retrieve(input.session_id);
      return { result: { ...session.shipping_details } };
    },
  })
  .mutation("create-account", {
    input: z.object({
      email: z.string(),
    }),
    async resolve({ ctx, input }) {
      const user = await ctx.stripe.customers.create({
        email: input.email,
      });
      if (user !== null) return { result: true };
      return { result: false };
      // returns null if user exists
      // creates a stripe account from a supplied email.
    },
  });