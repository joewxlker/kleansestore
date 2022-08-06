// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { mongoDbRouter, sendgridRouter, stripeRouter } from "./routes";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("mongo.", mongoDbRouter)
  .merge("stripe.", stripeRouter)
  .merge("sendgrid.", sendgridRouter)

// export type definition of API
export type AppRouter = typeof appRouter;

