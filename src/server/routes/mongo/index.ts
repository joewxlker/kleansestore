import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { bcrypt, saltRounds } from "../../api's/all";
import { createRouter } from "../../router/context";

export default createRouter()
  .middleware(async ({ ctx, next }) => {
  if (!process.env.MONGO_API_KEY) {
    throw new TRPCError({code: "INTERNAL_SERVER_ERROR"})
  }
  await ctx.mongo.connect();
  return next();
})
  .mutation("login", {
    input: z.object({
      email: z.string(),
      password: z.string(),
    }),
    async resolve({ ctx, input }) {
      try {
        const login = await ctx.mongo.db("onlinestore").collection("user_data").findOne({ email: input.email });
        await ctx.mongo.close();
        if (login === null) return { result: false };
        //queries db for matching email and returns false if none found

        const compare = await bcrypt.compare(input.password, login.password);
        if (!compare) return { result: false };
        // compares hash stored in db with users password input
        return { result: true };
        // return true, nextauth handles signin
      } catch (err) {
        await ctx.mongo.close();
        return { result: false };
      }
    },
  })

  .mutation("add-maillist", {
    input: z.object({
      email: z.string(),
    }),
    async resolve({ ctx, input }) {
      const exists = await ctx.mongo.db("onlinestore").collection("mail_list").findOne({ email: input.email });
      const res = exists !== null ? null : await ctx.mongo.db("onlinestore").collection("mail_list").insertOne({ email: input.email });
      await ctx.mongo.close();
      if (res === null) return { result: "EMAIL_EXISTS" };
      return { result: "ADDED_MAILLIST" };
    },
  })

  .mutation("sign-up", {
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
      const login = await ctx.mongo.db("onlinestore").collection("user_data").findOne({ email: input.email });
      if (login !== null) return { result: "ACCOUNT_EXISTS" };

      const createHash = async (password: string) => {
        const hashed = await bcrypt.hash(password, saltRounds);
        return hashed;
      };

      const hash = await createHash(input.password);
      const mongouser = { ...input, ["password"]: hash, cart: [] };
      await ctx.mongo.db("onlinestore").collection("user_data").insertOne(mongouser);
      // inserts new user to DB
      await ctx.stripe.customers.create({ email: input.email });
      await ctx.mongo.close();
      //TODO create Validation Email
      return { result: "SUCCESS" };
    },
  })
  .mutation("mongo-carts", {
    input: z.object({
      email: z.string(),
      item: z.array(
        z.object({
          image: z.string(),
          default_price: z.string(),
          quantity: z.number(),
          name: z.string(),
          amount: z.number(),
        }),
      ),
    }),
    async resolve({ ctx, input }) {
      await ctx.mongo.connect();
      const user = await ctx.mongo.db("onlinestore").collection("user_data").findOne({ email: input.email });
      if (user) {
        const res = await ctx.mongo
          .db("onlinestore")
          .collection("user_data")
          .updateOne({ email: input.email }, { $set: { cart: input.item } });
        console.log(res);
        //TODO handle response
        await ctx.mongo.close();
        return true;
      } else {
        await ctx.mongo.close();
        return false;
      }
    },
  })

  .query("mongo-carts", {
    input: z.object({
      email: z.string(),
    }),
    async resolve({ ctx, input }) {
      await ctx.mongo.connect();
      const cart: any = await ctx.mongo.db("onlinestore").collection("user_data").findOne({ email: input.email });
      await ctx.mongo.close();
      return cart.cart;
    },
  });
