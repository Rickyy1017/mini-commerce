import "../styles/globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Providers from "./providers";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mini-Commerce",
  description: "Frontend assessment project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster position="top-right" toastOptions={{ duration: 2000 }} />
        </Providers>
      </body>
    </html>
  );
}
