import { MailDataRequired } from "@sendgrid/mail";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createRouter } from "../../router/context";

export default createRouter()
    .middleware(async ({ctx, next}) => {
      if (!process.env.STRIPE_SECRET_KEY) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "No API key found" })
      }
      ctx.sendgrid.setApiKey(process.env.STRIPE_SECRET_KEY);
      return next();
    })
    .mutation("send-email", {
    input: z.object({
      firstname: z.string(),
      email: z.string(),
      message: z.string(),
    }),
    async resolve({ ctx, input }) {
      try {
        const contact: MailDataRequired = {
          to: process.env.OWNER,
          from: process.env.EMAIL ?? '',
          subject: ` New customer contact email sent from ${input.email}`,
          text: `hello, ${ctx.req?.body.message} Sent from Kleanse Website`,
        };
        //TODO add request params and conditional email templates
        await ctx.sendgrid.send(contact);
        return { result: true };
      } catch (err) {
        return { result: false };
      }
    },
  });
  