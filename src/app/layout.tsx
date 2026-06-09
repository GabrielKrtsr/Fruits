import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const siteUrl = "https://verger-co.fr";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Verger & Co — Fruits & légumes frais de saison",
    template: "%s · Verger & Co",
  },
  description:
    "Primeur premium : fruits et légumes frais, de saison et cueillis à la main par des producteurs passionnés. Du verger à votre table, sans détour.",
  keywords: [
    "fruits frais",
    "légumes de saison",
    "primeur",
    "bio",
    "panier de fruits",
    "circuit court",
  ],
  authors: [{ name: "Verger & Co" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "Verger & Co",
    title: "Verger & Co — Fruits & légumes frais de saison",
    description:
      "Des fruits et légumes frais, de saison et cueillis à la main. Du verger à votre table, sans détour.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Verger & Co — Fruits & légumes frais de saison",
    description:
      "Des fruits et légumes frais, de saison et cueillis à la main. Du verger à votre table.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
