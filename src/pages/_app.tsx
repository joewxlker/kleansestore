// src/pages/_app.tsx
import type { AppRouter } from "../server/router";
import superjson from "superjson";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { createTRPCClient } from "@trpc/client";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import { withTRPC } from "@trpc/next";
import { AppType } from "next/app";
import { AppProps } from 'next/app'
import { ProductData } from "../models";

export const CartContext = createContext<[ProductData[], Dispatch<SetStateAction<ProductData[]>>] | [null, null]>([null, null]);

const MyApp: AppType = ({ Component, pageProps: { session, ...pageProps } }: AppProps ) => {
  const [items, setItems] = useState<ProductData[]>([]);
  return (
    <CartContext.Provider value={[items, setItems]}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </CartContext.Provider>
  );
};

const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return "";
  }
  // Browser should use current path
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  // SSR should use vercel url

  return `http://localhost:${process.env.PORT ?? 3000}`;
  // dev SSR should use localhost
};

export default withTRPC<AppRouter>({
  config() {
    const url = `${getBaseUrl()}/api/trpc`;
    return {
      url,
      transformer: superjson,
    };
  },
  ssr: false,
})(MyApp);

export const client = createTRPCClient<AppRouter>({
  url: `${getBaseUrl()}/api/trpc`,
});
