import type { Metadata } from "next";
import { Syne, Onest, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const onest = Onest({
  subsets: ["latin"],
  variable: "--font-onest",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "mockX — MacBook Mockup Tool",
  description:
    "Turn any screenshot into a pixel-perfect MacBook mockup. Choose your app frame, desk scene, and export at any resolution.",
  keywords: ["mockup", "macbook", "screenshot", "safari", "design tool"],
  openGraph: {
    title: "mockX — MacBook Mockup Tool",
    description: "Turn any screenshot into a pixel-perfect MacBook mockup.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${onest.variable} ${jetbrains.variable}`}
    >
      <body className="font-onest bg-bg text-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
