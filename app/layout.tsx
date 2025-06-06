import type React from "react";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { CartProvider } from "@/hooks/CartContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Namoh Sundari - Sacred Scents, Divine You",
  description:
    "Discover premium natural aroma products: Zodiac-based perfumes, essential oils, attars, and incense sticks. Handcrafted, alcohol-free, rooted in Indian traditions.",
  keywords:
    "aromatherapy, natural perfumes, essential oils, attars, incense, zodiac scents, spiritual wellness, Indian traditions",
  openGraph: {
    title: "Namoh Sundari - Sacred Scents, Divine You",
    description:
      "Handcrafted aromatherapy rooted in ancient wisdom. Discover your spiritual essence through sacred fragrances.",
    images: ["/og-image.jpg"],
  },
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className={`${inter.className} antialiased`}>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
