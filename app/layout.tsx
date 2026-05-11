import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";

const heading = Playfair_Display({ subsets: ["latin"], variable: "--font-heading" });
const body = Outfit({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "Luxe & Log | Raw & Refined Living",
  description: "Lagos' premier destination for street-luxe furniture.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}