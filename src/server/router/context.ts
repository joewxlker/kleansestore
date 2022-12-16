// src/server/router/context.ts
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { mongo } from "../db/mongo";
import { stripe, sendgrid } from "../api's/all";

export const createContext = (opts?: trpcNext.CreateNextContextOptions) => {
  // create context here to allow strong typing from end 2 end

  const req = opts?.req;
  const res = opts?.res;

  return {
    req,
    res,
    mongo,
    stripe,
    sendgrid,

    // refers to dependencies/ @types,
  };
};

type Context = trpc.inferAsyncReturnType<typeof createContext>;

export const createRouter = () => trpc.router<Context>();
