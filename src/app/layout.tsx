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
  title: "forçabarça.club — The Home of Blaugrana",
  description:
    "The ultimate FC Barcelona fan community. News, fixtures, standings, squad, and club history. Join 2M+ Culés worldwide. Més que un club.",
  keywords: [
    "Barcelona",
    "FC Barcelona",
    "Barça",
    "Força Barça",
    "forcabarca",
    "La Liga",
    "Champions League",
    "Camp Nou",
    "Football",
    "Culés",
  ],
  openGraph: {
    title: "forçabarça.club — The Home of Blaugrana",
    description:
      "The ultimate FC Barcelona fan community. Join 2M+ Culés worldwide. Més que un club.",
    type: "website",
    locale: "en_US",
    siteName: "forçabarça.club",
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
