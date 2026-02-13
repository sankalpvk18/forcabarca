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

const categoryColors: Record<string, string> = {
  transfers: "bg-barca-gold/20 text-barca-gold border-barca-gold/30",
  "match previews": "bg-green-500/20 text-green-400 border-green-500/30",
  "match reviews": "bg-barca-red/20 text-barca-red-light border-barca-red/30",
  analysis: "bg-barca-blue/20 text-barca-blue-light border-barca-blue/30",
};

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [visibleCount, setVisibleCount] = useState<number>(7);

  const filteredNews =
    selectedCategory === "all"
      ? newsData
      : newsData.filter((article) => article.category === selectedCategory);

  const visibleArticles = filteredNews.slice(0, visibleCount);
  const hasMore = visibleCount < filteredNews.length;

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-14"
        >
          <h1 className="text-6xl font-extrabold tracking-tight leading-none mb-4">
            NEWS &<br />
            <span className="text-primary italic">ANALYSIS</span>
          </h1>
          <p className="text-slate-400 max-w-xl text-lg">
            Deep dives, tactical breakdowns, and breaking stories from the heart
            of Camp Nou. Stay ahead of every Blaugrana moment.
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap items-center gap-3 border-y border-primary/10 py-6 mb-12"
        >
          <span className="text-sm font-semibold text-slate-500 uppercase tracking-widest mr-2">
            Filter By
          </span>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setVisibleCount(7);
              }}
              className={`px-6 py-2 rounded-full font-semibold text-sm capitalize transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-primary/10 border border-primary/20 text-primary"
                  : "border border-primary/10 hover:border-primary/40 text-slate-400"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleArticles.map((article, index) => {
            const isFirst = index === 0;

            if (isFirst) {
              return (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.05,
                    duration: 0.5,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="lg:col-span-2 group"
                >
                  <Link href={`/news/${article.slug}`}>
                    <div className="rounded-xl bg-primary/5 editorial-shadow transition-all hover:-translate-y-1 overflow-hidden">
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                          style={{
                            backgroundImage: `url('${article.thumbnail}')`,
                          }}
                        />
                        <div className="absolute inset-0 card-gradient" />
                        <div className="absolute bottom-6 left-6 right-6">
                          <div className="flex items-center gap-3 mb-4">
                            <span
                              className={`tag ${
                                categoryColors[article.category] ||
                                "bg-primary/20 text-primary border-primary/30"
                              }`}
                            >
                              {article.category}
                            </span>
                            <span className="tag bg-white/10 text-white/70 border-white/20">
                              Featured
                            </span>
                          </div>
                          <h3 className="text-3xl font-extrabold leading-tight mb-3 drop-shadow-lg">
                            {article.title}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-slate-400 mb-3">
                            <span className="font-medium">
                              Barcelona Editorial
                            </span>
                            <span className="w-1 h-1 rounded-full bg-slate-500" />
                            <span>8 min read</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-6 pt-4">
                        <p className="text-slate-400 leading-relaxed mb-5 line-clamp-3">
                          {article.excerpt}
                        </p>
                        <span className="inline-flex items-center gap-2 text-primary font-extrabold text-sm uppercase tracking-widest group-hover:gap-3 transition-all duration-300">
                          READ FULL ANALYSIS
                          <span className="material-icons text-base">east</span>
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              );
            }

            return (
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
                  <div className="rounded-xl bg-primary/5 editorial-shadow transition-all hover:-translate-y-1 overflow-hidden">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        style={{
                          backgroundImage: `url('${article.thumbnail}')`,
                        }}
                      />
                      <div className="absolute inset-0 card-gradient" />
                      <div className="absolute top-4 left-4">
                        <span
                          className={`tag ${
                            categoryColors[article.category] ||
                            "bg-primary/20 text-primary border-primary/30"
                          }`}
                        >
                          {article.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                        <span>
                          {new Date(article.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-slate-600" />
                        <span>5 min read</span>
                      </div>
                      <h3 className="text-lg font-bold leading-snug mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-slate-400 line-clamp-2 mb-5 leading-relaxed">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 text-primary font-semibold text-xs uppercase tracking-widest">
                          READ
                          <span className="material-icons text-sm">
                            bookmark_border
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </div>

        {/* Load More */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-16 text-center"
          >
            <button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="border border-primary/30 hover:bg-primary hover:text-white rounded-xl px-10 py-5 font-extrabold tracking-widest text-sm uppercase transition-all duration-300"
            >
              Load More
            </button>
            <p className="mt-4 text-slate-500 text-sm">
              Discover More Insights &middot; Showing {visibleArticles.length}{" "}
              of {filteredNews.length}
            </p>
          </motion.div>
        )}
      </div>

      {/* Newsletter CTA */}
      <section className="bg-primary text-white py-24 px-6 mt-24 relative overflow-hidden">
        <span
          className="material-icons absolute right-10 top-1/2 -translate-y-1/2 text-[20rem] text-white pointer-events-none select-none"
          style={{ opacity: 0.1 }}
        >
          newspaper
        </span>
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-none mb-6">
            DON&apos;T MISS A<br />
            SINGLE BEAT.
          </h2>
          <p className="text-white/70 text-lg mb-10 max-w-md mx-auto">
            Get the latest Barcelona news, analysis, and exclusive content
            delivered straight to your inbox.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row items-center gap-4 max-w-lg mx-auto"
          >
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full flex-1 bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-white placeholder:text-white/40 outline-none focus:border-white/50 transition-colors"
            />
            <button
              type="submit"
              className="w-full sm:w-auto bg-white text-primary font-extrabold uppercase tracking-widest text-sm px-8 py-4 rounded-xl hover:bg-white/90 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
