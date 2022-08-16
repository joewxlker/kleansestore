// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { mongoDbRouter, sendgridRouter, stripeRouter } from "./routes";

export const appRouter = createRouter()

  //appRouter = main router
  // .transformer(superjson)
  .merge("mongo.", mongoDbRouter)
  .merge("stripe.", stripeRouter)
  .merge("sendgrid.", sendgridRouter)
// .merge merges all routes with merge into appRouter

// export type definition of API
export type AppRouter = typeof appRouter;

