"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import newsData from "@/data/news.json";

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Home() {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Next match date (example - March 15, 2024)
  const nextMatchDate = new Date("2024-03-15T20:00:00");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = nextMatchDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeRemaining({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const latestNews = newsData.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-[85vh] flex items-end pb-24 overflow-hidden"
      >
        {/* Background Image */}
        <img
          src="/camp-nou-hero.jpg"
          alt="Camp Nou Stadium"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 hero-gradient" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-block bg-accent-red text-white text-xs font-bold uppercase rounded mb-6 px-3 py-1.5 tracking-[0.2em]"
            >
              Next Match: 2 days to go
            </motion.span>

            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-7xl md:text-9xl font-extrabold text-white tracking-tighter leading-none"
            >
              FC BARCELONA
            </motion.h1>

            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-2xl md:text-3xl font-light text-slate-300 italic mt-4 mb-10"
            >
              M&eacute;s que un club
            </motion.p>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/fixtures"
                className="inline-flex items-center gap-2 bg-primary text-white px-7 py-3.5 rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-barca-blue-light transition-colors"
              >
                <span className="material-icons text-lg">calendar_today</span>
                View Fixtures
              </Link>
              <Link
                href="/fixtures"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-7 py-3.5 rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-white/20 transition-colors"
              >
                Buy Tickets
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Stats & Countdown Grid */}
      <section className="-mt-16 z-20 relative max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Countdown Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 glass-card p-8 rounded-xl"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xs uppercase tracking-[0.2em] text-slate-500 font-bold mb-1">
                  Next Match Countdown
                </h3>
                <p className="text-lg font-bold text-white">
                  FC Barcelona vs Real Madrid
                </p>
              </div>
              <span className="material-icons text-primary/40 text-3xl">
                schedule
              </span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Days", value: timeRemaining.days },
                { label: "Hours", value: timeRemaining.hours },
                { label: "Minutes", value: timeRemaining.minutes },
              ].map((item) => (
                <div
                  key={item.label}
                  className="text-center bg-black/30 rounded-lg py-5"
                >
                  <div className="text-4xl font-extrabold text-white tracking-tight">
                    {String(item.value).padStart(2, "0")}
                  </div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest mt-1 font-semibold">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Stats Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="glass-card p-8 rounded-xl flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-slate-500 font-bold">
                  Founded
                </span>
                <span className="text-white font-bold">1899</span>
              </div>
              <div className="h-px bg-white/5" />
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-slate-500 font-bold">
                  Stadium
                </span>
                <span className="text-white font-bold text-sm">
                  Spotify Camp Nou
                </span>
              </div>
              <div className="h-px bg-white/5" />
            </div>
            <div className="mt-6 text-center">
              <div className="text-5xl font-black text-primary leading-none">
                27
              </div>
              <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mt-2">
                La Liga Titles
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl font-extrabold tracking-tight">
            Latest News
          </h2>
          <Link
            href="/news"
            className="flex items-center gap-1 text-primary hover:text-barca-blue-light transition-colors font-semibold text-sm"
          >
            View All News
            <span className="material-icons text-lg">arrow_forward</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {latestNews.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group"
            >
              <Link href={`/news/${article.slug}`}>
                <div className="glass-card rounded-xl overflow-hidden">
                  {/* Image */}
                  <div className="aspect-video overflow-hidden relative">
                    <img
                      src={article.thumbnail}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-primary/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="p-6">
                    <div className="text-xs text-slate-500 mb-2">
                      {new Date(article.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-slate-400 text-sm line-clamp-2">
                      {article.excerpt}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>

      {/* CTA Membership Banner */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-gradient-to-r from-background-dark to-primary/20 border-y border-white/5"
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Be Part of the Legend
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10">
            Join thousands of cul&eacute;s worldwide. Get exclusive access to
            match highlights, behind-the-scenes content, members-only events,
            and priority ticket purchasing.
          </p>
          <Link
            href="/fixtures"
            className="inline-flex items-center gap-2 bg-accent-gold hover:bg-yellow-500 text-background-dark px-8 py-4 rounded-lg font-black text-sm uppercase tracking-wider transition-colors"
          >
            Join the Family
          </Link>
        </div>
      </motion.section>
    </div>
  );
}
