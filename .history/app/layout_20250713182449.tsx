import "../styles/globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Providers from "./providers";
import { Toaster } from "react-hot-toast";
import AOSInit from "../components/AOSInit";
import CartIcon from "@/components/CartIcon";
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
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <AOSInit />
          {children}
          <Toaster position="top-right" toastOptions={{ duration: 2000 }} />
        </Providers>
      </body>
    </html>
  );
}
