"use client";

import { motion } from "framer-motion";
import historyData from "@/data/history.json";

const categoryColors: Record<string, string> = {
  founding: "bg-yellow-500/20 text-yellow-400 border-yellow-500/50",
  trophy: "bg-green-500/20 text-green-400 border-green-500/50",
  legend: "bg-barca-blue/20 text-barca-blue border-barca-blue/50",
  stadium: "bg-purple-500/20 text-purple-400 border-purple-500/50",
  milestone: "bg-barca-red/20 text-barca-red border-barca-red/50",
  "iconic match": "bg-orange-500/20 text-orange-400 border-orange-500/50",
};

export default function HistoryPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Club History</h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
            Since 1899, FC Barcelona has written one of football&apos;s greatest stories.
            From humble beginnings to global dominance, explore the journey of més que un club.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-barca-blue via-barca-red to-barca-blue hidden md:block"></div>

          {/* Timeline Items */}
          <div className="space-y-12">
            {historyData.map((item, index) => {
              const isLeft = index % 2 === 0;
              const categoryColor = categoryColors[item.category] || categoryColors.milestone;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className={`relative grid grid-cols-1 md:grid-cols-2 gap-8 ${
                    isLeft ? "" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Content */}
                  <div className={`${isLeft ? "md:text-right" : "md:col-start-2"}`}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:border-barca-blue/50 transition-all"
                    >
                      {/* Year Badge */}
                      <div
                        className={`inline-block px-4 py-2 rounded-full text-sm font-bold mb-4 border ${categoryColor}`}
                      >
                        {item.year}
                      </div>

                      {/* Category */}
                      <div className="text-xs uppercase tracking-wider text-gray-400 mb-2">
                        {item.category}
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl font-bold mb-3">{item.title}</h3>

                      {/* Description */}
                      <p className="text-gray-300 leading-relaxed">
                        {item.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Center Dot */}
                  <div className="hidden md:block absolute left-1/2 top-8 transform -translate-x-1/2">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      className="w-6 h-6 bg-barca-blue rounded-full border-4 border-barca-navy shadow-lg shadow-barca-blue/50"
                    ></motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Legacy Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-barca-blue to-barca-red p-8 md:p-12 rounded-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The Journey Continues
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              With a rich history spanning over 125 years, FC Barcelona continues to
              shape the future of football while staying true to its values. Més que un club.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
