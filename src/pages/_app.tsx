/* eslint-disable import/no-extraneous-dependencies */
import "../styles/global.css";

import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";
import type { AppProps } from "next/app";
import localFont from "next/font/local";

import { AuthContextProvider } from "@/lib/auth";

const sfPro = localFont({
  src: [
    {
      path: "../../public/fonts/SF-Pro-Display-Black.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../public/fonts/SF-Pro-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/SF-Pro-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/SF-Pro.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-sfPro",
});

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ClerkProvider>
    <AuthContextProvider>
      <main className={`${sfPro.variable} font-sans`}>
        <Component {...pageProps} />
        <Analytics />
      </main>
    </AuthContextProvider>
  </ClerkProvider>
);

export default MyApp;
