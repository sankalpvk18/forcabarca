"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import newsData from "@/data/news.json";

const categories = [
  "all",
  "transfers",
  "match previews",
  "match reviews",
  "analysis",
];

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredNews =
    selectedCategory === "all"
      ? newsData
      : newsData.filter((article) => article.category === selectedCategory);

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-14"
        >
          <span className="tag text-barca-gold border-barca-gold/30 mb-4 inline-block">
            Latest
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-3">
            News & Analysis
          </h1>
          <p className="text-white/30 font-body text-lg">
            Latest updates from FC Barcelona
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-10 flex flex-wrap gap-2"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-xl text-[0.75rem] font-body font-medium uppercase tracking-wider transition-all duration-300 capitalize ${
                selectedCategory === category
                  ? "bg-barca-blue/20 text-white border border-barca-blue/30"
                  : "text-white/30 hover:text-white/60 border border-white/[0.06] hover:border-white/[0.1]"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.05,
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="group"
            >
              <Link href={`/news/${article.slug}`}>
                <div className="glass-card-glow rounded-2xl overflow-hidden">
                  <div className="relative h-56 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                      style={{
                        backgroundImage: `url('${article.thumbnail}')`,
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-barca-navy via-barca-navy/20 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="tag text-barca-blue border-barca-blue/30 bg-barca-navy/80 backdrop-blur-sm">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-lg font-bold mb-3 leading-snug group-hover:text-barca-blue-light transition-colors duration-300 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-white/30 line-clamp-2 mb-5 font-body leading-relaxed">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-[0.7rem] text-white/20 font-body">
                        {new Date(article.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      <span className="text-[0.7rem] text-barca-blue font-body font-semibold uppercase tracking-wider group-hover:translate-x-1 transition-transform duration-300">
                        Read &rarr;
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
