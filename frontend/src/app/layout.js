// src/app/layout.js
import { Geist, Geist_Mono, Atma, Modak } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const atma = Atma({ variable: "--font-atma", subsets: ["latin"], weight: ["400","700"] });
const modak = Modak({ variable: "--font-modak", subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "Kiwiexplorers – Early Childhood Centre",
  description:
    "Nurturing learning through play. Enrol, explore our gallery, meet the team, and get in touch.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${atma.variable} ${modak.variable}`}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}