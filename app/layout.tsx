import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import DiscountPopup from "@/components/DiscountPopup";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "SM Sanat Matbaası - Kişiye Özel Ürünler ve Promosyon Ürünleri",
  description: "Kişiye özel kalemler, hediyeler, matbaa ürünleri, düğün davetiyeleri ve promosyon ürünleri. Ücretsiz kargo ve ücretsiz tasarım hizmeti.",
  keywords: "sanat matbaası, kişiye özel kalem, promosyon ürünleri, matbaa, düğün davetiyesi, özel hediyeler, toptan alım",
  authors: [{ name: "SM Sanat Matbaası" }],
  openGraph: {
    title: "SM Sanat Matbaası - Kişiye Özel Ürünler",
    description: "Kişiye özel kalemler, hediyeler, matbaa ürünleri ve promosyon ürünleri",
    type: "website",
    locale: "tr_TR",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.sanmatmatbaasi.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={inter.variable}>
      <body className="min-h-screen flex flex-col">
        <Providers>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <WhatsAppFloat />
          <DiscountPopup />
        </Providers>
      </body>
    </html>
  );
}

