import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lumina Estate | Vineyards",
  description: "Unveiling the essence of fine wine at Lumina Estate Vineyards.",
  openGraph: {
    title: "Lumina Estate | Vineyards",
    description: "Unveiling the essence of fine wine at Lumina Estate Vineyards.",
    url: "https://wine-lokal.vercel.app/",
    siteName: "Lumina Estate",
    images: [
      {
        url: "https://wine-lokal.vercel.app/banner.jpg",
        width: 1200,
        height: 630,
        alt: "Lumina Estate Vineyards",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumina Estate | Vineyards",
    description: "Unveiling the essence of fine wine at Lumina Estate Vineyards.",
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
