import type { Metadata } from "next";
import { Syne, Outfit } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FC Barcelona - Official Fan Website",
  description:
    "The ultimate FC Barcelona fan destination for news, fixtures, standings, squad information, and club history. Més que un club.",
  keywords: [
    "Barcelona",
    "FC Barcelona",
    "Barça",
    "La Liga",
    "Champions League",
    "Camp Nou",
    "Football",
  ],
  openGraph: {
    title: "FC Barcelona - Official Fan Website",
    description:
      "The ultimate FC Barcelona fan destination. Més que un club.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${outfit.variable}`}>
      <body className="antialiased bg-barca-navy text-white min-h-screen font-body grain-overlay">
        {/* Ambient background gradient mesh */}
        <div className="fixed inset-0 bg-gradient-mesh pointer-events-none z-0" />

        <div className="relative z-10">
          <Navigation />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
