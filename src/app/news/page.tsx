"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import newsData from "@/data/news.json";

const categories = ["all", "transfers", "match previews", "match reviews", "analysis"];

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredNews =
    selectedCategory === "all"
      ? newsData
      : newsData.filter((article) => article.category === selectedCategory);

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">News & Analysis</h1>
          <p className="text-gray-400 text-lg">
            Latest updates from FC Barcelona
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 flex flex-wrap gap-2"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                selectedCategory === category
                  ? "bg-barca-blue text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group"
            >
              <Link href={`/news/${article.slug}`}>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden hover:border-barca-blue/50 transition-all hover:transform hover:-translate-y-2">
                  <div
                    className="h-56 bg-cover bg-center"
                    style={{ backgroundImage: `url('${article.thumbnail}')` }}
                  />
                  <div className="p-6">
                    <div className="text-xs text-barca-blue uppercase tracking-wider mb-2">
                      {article.category}
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-barca-blue transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-3 mb-4">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>
                        {new Date(article.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                      <span className="text-barca-blue group-hover:text-barca-red transition-colors">
                        Read More →
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
