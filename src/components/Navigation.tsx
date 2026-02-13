"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/standings", label: "Standings" },
  { href: "/fixtures", label: "Fixtures" },
  { href: "/live", label: "Live" },
  { href: "/news", label: "News" },
  { href: "/squad", label: "Squad" },
  { href: "/history", label: "History" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background-dark/80 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      {/* Live Score Banner */}
      <div className="bg-card-dark/80 border-b border-primary/20 py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-accent-red rounded-full animate-pulse-red" />
              <span className="text-accent-red font-bold text-xs uppercase tracking-wider">
                Live
              </span>
            </span>
            <span className="text-slate-400 text-xs hidden sm:inline">
              La Liga &bull; Matchday 24
            </span>
            <span className="bg-black/40 px-3 py-1 rounded-full text-xs font-bold tracking-wide">
              BAR <span className="text-primary">2</span> -{" "}
              <span className="text-slate-400">0</span> ATM
            </span>
            <span className="text-accent-red text-xs font-semibold">
              67&apos;
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-xs">
            <Link
              href="/live"
              className="text-slate-400 hover:text-white transition-colors font-medium"
            >
              Match Center
            </Link>
            <Link
              href="/fixtures"
              className="text-slate-400 hover:text-white transition-colors font-medium"
            >
              Tickets
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <span className="text-white font-display font-bold text-sm tracking-tight">
                FCB
              </span>
            </div>
            <span className="hidden sm:block font-display text-lg font-bold uppercase tracking-tight text-white">
              FC BARCELONA
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-semibold uppercase tracking-wider transition-colors duration-300 ${
                    isActive
                      ? "text-primary border-b-2 border-primary pb-1"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {link.label}
                  {link.label === "Live" && (
                    <span className="absolute top-1 right-0.5 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right section: Search + CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            {/* Search icon */}
            <button
              className="hidden md:flex items-center justify-center w-10 h-10 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-all duration-300"
              aria-label="Search"
            >
              <span className="material-icons text-xl">search</span>
            </button>

            {/* CTA Button */}
            <Link
              href="#"
              className="hidden md:inline-flex items-center px-5 py-2.5 bg-primary hover:bg-primary/90 text-white text-sm font-semibold rounded-lg transition-colors duration-300"
            >
              Culers Membership
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden relative w-10 h-10 flex items-center justify-center"
              aria-label="Toggle menu"
            >
              <div className="relative w-5 h-4 flex flex-col justify-between">
                <motion.span
                  animate={
                    mobileMenuOpen
                      ? { rotate: 45, y: 7 }
                      : { rotate: 0, y: 0 }
                  }
                  className="block h-[1.5px] w-full bg-white origin-center transition-colors"
                />
                <motion.span
                  animate={
                    mobileMenuOpen
                      ? { opacity: 0, x: -10 }
                      : { opacity: 1, x: 0 }
                  }
                  className="block h-[1.5px] w-3/4 bg-white/60"
                />
                <motion.span
                  animate={
                    mobileMenuOpen
                      ? { rotate: -45, y: -7 }
                      : { rotate: 0, y: 0 }
                  }
                  className="block h-[1.5px] w-full bg-white origin-center transition-colors"
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="lg:hidden glass-card overflow-hidden"
          >
            <div className="px-4 py-6 space-y-1">
              {navLinks.map((link, index) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-semibold uppercase tracking-wider transition-all ${
                        isActive
                          ? "text-primary bg-primary/10 border border-primary/20"
                          : "text-white/60 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {link.label}
                        {link.label === "Live" && (
                          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        )}
                      </span>
                      {isActive && (
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      )}
                    </Link>
                  </motion.div>
                );
              })}

              {/* Mobile CTA */}
              <div className="pt-4 px-4">
                <Link
                  href="#"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center w-full px-5 py-3 bg-primary hover:bg-primary/90 text-white text-sm font-semibold rounded-lg transition-colors duration-300"
                >
                  Culers Membership
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
