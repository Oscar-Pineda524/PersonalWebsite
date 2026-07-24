import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Oscar | Computer Science Portfolio",
    template: "%s | Oscar",
  },
  description:
    "Oscar's computer science portfolio featuring projects, experience, and technical problem-solving.",
  openGraph: {
    type: "website",
    title: "Oscar | Computer Science Portfolio",
    description:
      "Explore Oscar's projects, experience, and technical problem-solving.",
    images: [
      {
        url: "/og.png",
        width: 1536,
        height: 1024,
        alt: "Oscar Computer Science Portfolio channel menu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Oscar | Computer Science Portfolio",
    description:
      "Explore Oscar's projects, experience, and technical problem-solving.",
    images: ["/og.png"],
  },
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
