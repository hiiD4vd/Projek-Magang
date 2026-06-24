import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Infinity Vines | Cikarang",
  description: "Unveiling the absolute domain of fine wine at Infinity Vines Cikarang.",
  openGraph: {
    title: "Infinity Vines | Cikarang",
    description: "Unveiling the absolute domain of fine wine at Infinity Vines Cikarang.",
    url: "https://infinityvines.com",
    siteName: "Infinity Vines",
    images: [
      {
        url: "https://wine-lokal.vercel.app/banner.jpg",
        width: 1200,
        height: 630,
        alt: "Infinity Vines Cikarang",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Infinity Vines | Cikarang",
    description: "Unveiling the absolute domain of fine wine at Infinity Vines Cikarang.",
    images: ["https://wine-lokal.vercel.app/banner.jpg"],
  },
};

import { Providers } from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
