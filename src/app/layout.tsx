import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FC Barcelona - Official Fan Website",
  description: "The ultimate FC Barcelona fan destination for news, fixtures, standings, squad information, and club history. Més que un club.",
  keywords: ["Barcelona", "FC Barcelona", "Barça", "La Liga", "Champions League", "Camp Nou", "Messi", "Football"],
  openGraph: {
    title: "FC Barcelona - Official Fan Website",
    description: "The ultimate FC Barcelona fan destination. Més que un club.",
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
    <html lang="en" className={inter.variable}>
      <body className="antialiased bg-barca-navy text-white min-h-screen">
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
