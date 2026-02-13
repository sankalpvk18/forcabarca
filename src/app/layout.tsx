import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
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
    <html lang="en" className={lexend.variable}>
      <head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-background-dark text-slate-100 min-h-screen font-display">
        <div className="relative z-10">
          <Navigation />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
