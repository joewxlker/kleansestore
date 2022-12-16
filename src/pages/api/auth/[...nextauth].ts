import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { client } from "../../_app";
// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "email..." },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = { email: credentials?.email };
        if (user) {
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ credentials }) {
      if (credentials !== undefined) {
        if (credentials.email !== undefined && credentials.password !== undefined) {
          // @ts-ignore
          const res = await client.mutation("mongo.login", { email: credentials?.email, password: credentials?.password });
          if (res.result) return true;
          return false;
        }
      }
      return false;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, user, token }) {
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return token;
    },
  },
  theme: {
    colorScheme: "light",
    buttonText: "Sign in",
    logo: "/images/kleanse-logos/kleanse-wing-in-text.svg",
  },

  secret: "IamVeryHandsomelkmle2wmkl;M3`2K1`23,4L324@#$@3#@l43k@L3,K.$M4|26&3(452",
};

export default NextAuth(authOptions);
