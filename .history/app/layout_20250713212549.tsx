import "../styles/globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Providers from "./providers";
import { Toaster } from "react-hot-toast";
import AOSInit from "../components/AOSInit";
import CartIcon from "@/components/CartIcon";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import Footer from "@/components/Footer";

// Load Inter font from Google
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mini-Commerce | Buy Smartphones Online in Nigeria",
  description:
    "Shop the best smartphones at unbeatable prices with fast delivery across Nigeria. Buy now from Mini-Commerce!",
  openGraph: {
    title: "Mini-Commerce | Buy Smartphones Online in Nigeria",
    description:
      "Shop the best smartphones at unbeatable prices with fast delivery across Nigeria. Buy now from Mini-Commerce!",
    siteName: "Mini-Commerce",
    images: [
      {
        url: "/og image.jpg",
        width: 1200,
        height: 630,
        alt: "Mini-Commerce Hero Banner",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mini-Commerce | Buy Smartphones Online in Nigeria",
    description:
      "Shop the best smartphones at unbeatable prices with fast delivery across Nigeria.",
    images: ["/og image.jpg"],
    creator: "@flacko_eth",
  },
  icons: {
    icon: "/images/favicon.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-white text-black dark:bg-black dark:text-white transition-colors duration-300`}
      >
        <Providers>
          <AOSInit />
          {children}
          <CartIcon />
          <WhatsAppIcon />
          <Footer />
          <Toaster position="top-right" toastOptions={{ duration: 2000 }} />
        </Providers>
      </body>
    </html>
  );
}
