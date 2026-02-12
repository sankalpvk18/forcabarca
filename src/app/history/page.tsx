"use client";

import { motion } from "framer-motion";
import historyData from "@/data/history.json";

const categoryStyles: Record<string, { text: string; border: string; bg: string }> = {
  founding: { text: "text-barca-gold", border: "border-barca-gold/30", bg: "bg-barca-gold/10" },
  trophy: { text: "text-green-400", border: "border-green-500/30", bg: "bg-green-500/10" },
  legend: { text: "text-barca-blue", border: "border-barca-blue/30", bg: "bg-barca-blue/10" },
  stadium: { text: "text-purple-400", border: "border-purple-500/30", bg: "bg-purple-500/10" },
  milestone: { text: "text-barca-red-light", border: "border-barca-red/30", bg: "bg-barca-red/10" },
  "iconic match": { text: "text-orange-400", border: "border-orange-500/30", bg: "bg-orange-500/10" },
};

export default function HistoryPage() {
  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20 text-center max-w-3xl mx-auto"
        >
          <span className="tag text-barca-gold border-barca-gold/30 mb-6 inline-block">
            Since 1899
          </span>
          <h1 className="font-display text-4xl md:text-7xl font-bold tracking-tight mb-6">
            Club History
          </h1>
          <p className="text-white/30 font-body text-lg leading-relaxed">
            From humble beginnings to global dominance, explore the journey of
            més que un club — one of football&apos;s greatest stories.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-[1px] h-full bg-gradient-to-b from-barca-blue/30 via-barca-red/20 to-barca-blue/10 hidden md:block" />

          {/* Timeline Items */}
          <div className="space-y-16 md:space-y-20">
            {historyData.map((item, index) => {
              const isLeft = index % 2 === 0;
              const style = categoryStyles[item.category] || categoryStyles.milestone;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.7,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className={`relative grid grid-cols-1 md:grid-cols-2 gap-8 ${
                    isLeft ? "" : ""
                  }`}
                >
                  {/* Content */}
                  <div
                    className={`${
                      isLeft ? "md:text-right" : "md:col-start-2"
                    }`}
                  >
                    <div className="glass-card rounded-2xl p-7 group">
                      {/* Year Badge */}
                      <div
                        className={`inline-block tag ${style.text} ${style.border} ${style.bg} mb-5`}
                      >
                        {item.year}
                      </div>

                      {/* Category */}
                      <div className="text-[0.6rem] uppercase tracking-[0.2em] text-white/20 font-body mb-3">
                        {item.category}
                      </div>

                      {/* Title */}
                      <h3 className="font-display text-xl md:text-2xl font-bold tracking-tight mb-4 leading-snug">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="text-white/35 font-body leading-relaxed text-[0.9rem]">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Center Dot */}
                  <div className="hidden md:block absolute left-1/2 top-8 transform -translate-x-1/2">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      className="relative"
                    >
                      <div className="w-4 h-4 bg-barca-navy border-2 border-barca-blue/50 rounded-full" />
                      <div className="absolute inset-0 w-4 h-4 bg-barca-blue/30 rounded-full animate-ping" />
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Legacy Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-28 text-center"
        >
          <div className="relative overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-barca-blue/30 via-barca-red/20 to-barca-blue/30" />
            <div className="absolute inset-0 bg-glow-blue opacity-15" />
            <div className="relative p-10 md:p-16 border border-white/[0.06] rounded-2xl">
              <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-5">
                The Journey Continues
              </h2>
              <p className="text-white/40 font-body text-lg max-w-2xl mx-auto leading-relaxed">
                With a rich history spanning over 125 years, FC Barcelona
                continues to shape the future of football while staying true to
                its values. Més que un club.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
