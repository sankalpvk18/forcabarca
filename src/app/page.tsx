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
        className="relative h-[70vh] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1600&h=900&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 gradient-overlay" />
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-4"
          >
            FC <span className="text-barca-blue">Barcelona</span>
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-300 mb-8"
          >
            Més que un club
          </motion.p>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Link
              href="/fixtures"
              className="inline-block bg-gradient-to-r from-barca-blue to-barca-red text-white px-8 py-3 rounded-full font-semibold hover:scale-105 transition-transform"
            >
              View Fixtures
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Live Score Banner */}
      <section className="bg-gradient-to-r from-barca-blue to-barca-red py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm text-white/80 mb-1">NEXT MATCH</p>
            <p className="text-xl font-bold">FC Barcelona vs Real Madrid - El Clásico</p>
            <p className="text-sm text-white/90 mt-1">Santiago Bernabéu • March 15, 2024 • 20:00 CET</p>
          </div>
        </div>
      </section>

      {/* Countdown Timer */}
      <section className="py-12 bg-black/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">Next Match Countdown</h2>
          <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
            {[
              { label: "Days", value: timeRemaining.days },
              { label: "Hours", value: timeRemaining.hours },
              { label: "Minutes", value: timeRemaining.minutes },
              { label: "Seconds", value: timeRemaining.seconds },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white/5 backdrop-blur-sm border border-barca-blue/30 rounded-lg p-6 text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-barca-blue mb-2">
                  {String(item.value).padStart(2, "0")}
                </div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Latest News</h2>
            <Link
              href="/news"
              className="text-barca-blue hover:text-barca-red transition-colors font-medium"
            >
              View All →
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
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden hover:border-barca-blue/50 transition-all hover:transform hover:-translate-y-2">
                    <div
                      className="h-48 bg-cover bg-center"
                      style={{ backgroundImage: `url('${article.thumbnail}')` }}
                    />
                    <div className="p-6">
                      <div className="text-xs text-barca-blue uppercase tracking-wider mb-2">
                        {article.category}
                      </div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-barca-blue transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                        {article.excerpt}
                      </p>
                      <div className="text-xs text-gray-500">
                        {new Date(article.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-black/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "La Liga Titles", value: "27" },
              { label: "Champions League", value: "5" },
              { label: "Copa del Rey", value: "31" },
              { label: "Founded", value: "1899" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-barca-blue mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
