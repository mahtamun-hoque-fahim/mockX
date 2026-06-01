import type { Metadata } from "next";
import { Syne, Onest, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const syne      = Syne({ subsets: ["latin"], variable: "--font-syne",      display: "swap" });
const onest     = Onest({ subsets: ["latin"], variable: "--font-onest",     display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  title: "mockX — MacBook Mockup Tool",
  description: "Turn any screenshot into a pixel-perfect MacBook mockup. Safari, Chrome, Arc, VS Code and more. Export at 1×, 2×, or 3×. Free to start.",
  keywords: ["macbook mockup","screenshot mockup","safari mockup","browser mockup","mac mockup tool","design tool"],
  openGraph: {
    title: "mockX — MacBook Mockup Tool",
    description: "Turn any screenshot into a pixel-perfect MacBook mockup in seconds.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${onest.variable} ${jetbrains.variable}`}>
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
