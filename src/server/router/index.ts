// src/server/router/index.ts
import { createRouter } from "./context";
import  stripeRouter  from "../routes/stripe";
import  mongoDbRouter  from "../routes/mongo";
import sendgridRouter  from "../routes/sendgrid/sendgrid";

export const appRouter = createRouter()
  .merge("mongo.", mongoDbRouter)
  .merge("stripe.", stripeRouter)
  .merge("sendgrid.", sendgridRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
