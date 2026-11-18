import type { Metadata } from "next";
import { Source_Sans_3, Hanken_Grotesk } from "next/font/google";
import "./globals.css";

const headline = Source_Sans_3({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-headline-src",
});

const body = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["300"],
  variable: "--font-body-src",
});

export const metadata: Metadata = {
  title: "Psyfi",
  description: "You're not missing data. You're missing behavioural insight.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${headline.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}