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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-barca-navy/90 backdrop-blur-xl border-b border-white/[0.06] shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 bg-gradient-to-br from-barca-blue to-barca-red rounded-xl rotate-0 group-hover:rotate-6 transition-transform duration-500" />
              <div className="relative w-full h-full flex items-center justify-center">
                <span className="text-white font-display font-bold text-sm tracking-tight">
                  FCB
                </span>
              </div>
            </div>
            <div className="hidden sm:block">
              <span className="font-display text-lg font-bold tracking-tight">
                FC{" "}
                <span className="text-gradient-barca">Barcelona</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-[0.8rem] font-medium tracking-wide uppercase transition-colors duration-300 ${
                    isActive
                      ? "text-white"
                      : "text-white/50 hover:text-white/80"
                  }`}
                >
                  {link.label}
                  {link.label === "Live" && (
                    <span className="absolute top-1.5 right-1 w-1.5 h-1.5 bg-barca-red rounded-full animate-pulse" />
                  )}
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 bg-white/[0.06] rounded-lg border border-white/[0.08]"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center"
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
                  mobileMenuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }
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

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="md:hidden bg-barca-navy/95 backdrop-blur-xl border-t border-white/[0.06] overflow-hidden"
          >
            <div className="px-6 py-6 space-y-1">
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
                      className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium tracking-wide uppercase transition-all ${
                        isActive
                          ? "bg-white/[0.06] text-white border border-white/[0.08]"
                          : "text-white/50 hover:text-white hover:bg-white/[0.03]"
                      }`}
                    >
                      {link.label}
                      {isActive && (
                        <div className="w-1.5 h-1.5 rounded-full bg-barca-blue" />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
