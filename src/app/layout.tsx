import type { Metadata } from "next";
import { Instrument_Serif, Supermercado_One } from "next/font/google";
import { Footer } from "@/components/partials/footer/Footer";
import { Header } from "@/components/partials/header/Header";
import "./globals.scss";
import styles from "./layout.module.scss";

const instrument = Instrument_Serif({
  weight: ["400"],
  variable: "--font-instrument-serif",
  subsets: ["latin"],
});

const supermercado = Supermercado_One({
  weight: ["400"],
  variable: "--font-supermercado-one",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Personal portfolio site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${instrument.variable} ${supermercado.variable} ${styles.body}`}>
        <main className={styles.content}>{children}</main>
      </body>
    </html>
  );
}
