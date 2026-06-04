import type { Metadata } from "next";
import { Syne, Onest, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const syne      = Syne({ subsets: ["latin"], variable: "--font-syne",      display: "swap" });
const onest     = Onest({ subsets: ["latin"], variable: "--font-onest",     display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://mockx.app";

export const metadata: Metadata = {
  title:       "mockX — MacBook Mockup Tool",
  description: "Turn any screenshot into a pixel-perfect MacBook mockup. Safari, Chrome, Arc, VS Code and more. Export at 1×, 2×, or 3×. Free to start.",
  keywords:    ["macbook mockup","screenshot mockup","safari mockup","browser mockup","mac mockup tool","design tool"],
  metadataBase: new URL(APP_URL),
  icons: {
    icon:             [{ url: "/api/icon?size=32", sizes: "32x32", type: "image/png" }],
    apple:            [{ url: "/api/icon?size=180", sizes: "180x180", type: "image/png" }],
    shortcut:         [{ url: "/api/icon?size=48", sizes: "48x48", type: "image/png" }],
  },
  openGraph: {
    title:       "mockX — MacBook Mockup Tool",
    description: "Turn any screenshot into a pixel-perfect MacBook mockup in seconds.",
    type:        "website",
    images: [{ url: "/api/og?title=MacBook+Mockup+Tool&type=screen", width: 1200, height: 630 }],
  },
  twitter: {
    card:        "summary_large_image",
    title:       "mockX — MacBook Mockup Tool",
    description: "Turn any screenshot into a pixel-perfect MacBook mockup in seconds.",
    images:      ["/api/og?title=MacBook+Mockup+Tool&type=screen"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${onest.variable} ${jetbrains.variable}`}>
      <head>
        <meta name="theme-color" content="#6C63FF"/>
        <meta name="color-scheme" content="dark"/>
      </head>
      <body className="font-onest bg-bg text-text-primary antialiased">
        {children}
        {process.env.NEXT_PUBLIC_UMAMI_ID && (
          <Script
            defer
            src="https://cloud.umami.is/script.js"
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_ID}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
