import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/navigation/Footer";
import CartProviderWrapper from "./CartProviderWrapper";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: "Tech Car Autopecas",
  description: "O melhor lugar para o seu carro ficar perfeito",
  
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex flex-col min-h-screen`}
      >
        <CartProviderWrapper>
          <Header />
          {/* Faz o conteúdo crescer e empurrar o footer pro fim */}
          <main className="flex-grow">{children}</main>
          <Footer />
        </CartProviderWrapper>
      </body>
    </html>
  );
}
