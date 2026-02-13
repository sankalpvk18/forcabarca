"use client";

import { motion } from "framer-motion";
import historyData from "@/data/history.json";

const categoryStyles: Record<string, { text: string; border: string; bg: string; icon: string }> = {
  founding: { text: "text-amber-500", border: "border-amber-500/30", bg: "bg-amber-500/10", icon: "history_edu" },
  trophy: { text: "text-indigo-400", border: "border-indigo-500/30", bg: "bg-indigo-500/10", icon: "emoji_events" },
  legend: { text: "text-rose-500", border: "border-rose-500/30", bg: "bg-rose-500/10", icon: "star" },
  stadium: { text: "text-blue-400", border: "border-blue-500/30", bg: "bg-blue-500/10", icon: "stadium" },
  milestone: { text: "text-emerald-500", border: "border-emerald-500/30", bg: "bg-emerald-500/10", icon: "psychology" },
  "iconic match": { text: "text-orange-400", border: "border-orange-500/30", bg: "bg-orange-500/10", icon: "sports_soccer" },
};

export default function HistoryPage() {
  return (
    <div className="min-h-screen bg-background-dark">
      {/* Header */}
      <header className="relative pt-24 pb-16 overflow-hidden text-center">
        <img
          src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1600&h=900&fit=crop"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none select-none"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background-dark/60 to-background-dark" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative z-10"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary border border-primary/30 text-sm font-semibold tracking-wider mb-6">
            SINCE 1899
          </span>
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-6">
            Club History
          </h1>
          <p className="text-xl text-slate-400 font-light max-w-2xl mx-auto">
            A journey through time, defining the identity of M&eacute;s que un club.
          </p>
        </motion.div>
      </header>

      {/* Timeline */}
      <section className="max-w-6xl mx-auto px-6 py-20 relative">
        {/* Center vertical line (desktop only) */}
        <div className="hidden md:block absolute left-1/2 top-20 bottom-20 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent" />

        <div className="space-y-24 md:space-y-32">
          {historyData.map((item, index) => {
            const isLeft = index % 2 === 0;
            const style = categoryStyles[item.category] || categoryStyles.milestone;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.7,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="relative"
              >
                {/* Center year circle (desktop) */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.15, type: "spring", stiffness: 200 }}
                  className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-8 z-10 w-14 h-14 rounded-full bg-primary border-4 border-background-dark shadow-[0_0_24px_rgba(0,76,153,0.4)] items-center justify-center"
                >
                  <span className="text-white font-black text-lg leading-none">
                    {String(item.year).slice(-2)}
                  </span>
                </motion.div>

                {/* Card layout */}
                <div className={`md:flex md:items-start md:gap-0 ${isLeft ? "" : "md:flex-row-reverse"}`}>
                  {/* Content side */}
                  <div className={`md:w-1/2 ${isLeft ? "md:pr-14 md:text-right" : "md:pl-14"}`}>
                    {/* Mobile year pill */}
                    <div className="md:hidden mb-3">
                      <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-bold">
                        {item.year}
                      </span>
                    </div>

                    {/* Category badge */}
                    <div
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border ${style.text} ${style.border} ${style.bg}`}
                    >
                      <span className="material-icons text-sm">{style.icon}</span>
                      {item.category}
                    </div>

                    {/* Year (desktop - subtle) */}
                    <div className="hidden md:block mb-2">
                      <span className="text-sm font-bold text-white/30">{item.year}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-bold mb-3 leading-snug">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p
                      className={`text-slate-400 leading-relaxed text-sm md:text-base ${
                        isLeft ? "md:ml-auto" : ""
                      } max-w-md ${isLeft ? "md:ml-auto" : ""}`}
                    >
                      {item.description}
                    </p>
                  </div>

                  {/* Image side */}
                  <div className={`md:w-1/2 mt-6 md:mt-0 ${isLeft ? "md:pl-14" : "md:pr-14"}`}>
                    <div className="rounded-xl overflow-hidden border border-white/[0.06] group">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-56 md:h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Footer Coda */}
      <footer className="py-32 border-t border-slate-800 relative overflow-hidden">
        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center text-[20rem] md:text-[28rem] font-black uppercase leading-none text-white opacity-5 pointer-events-none select-none"
        >
          BAR&Ccedil;A
        </span>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center max-w-3xl mx-auto px-6"
        >
          <h2 className="text-5xl font-black uppercase tracking-tight mb-6">
            The Journey Continues
          </h2>
          <p className="text-lg text-slate-400 font-light leading-relaxed mb-10">
            With a rich history spanning over 125 years, FC Barcelona continues to shape
            the future of football while staying true to its values.&nbsp;
            <span className="italic text-slate-300">M&eacute;s que un club.</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#"
              className="px-8 py-3.5 rounded-lg bg-primary text-white font-semibold text-sm tracking-wide hover:bg-primary/90 transition-colors"
            >
              Visit the Museum
            </a>
            <a
              href="#"
              className="px-8 py-3.5 rounded-lg border border-slate-600 text-slate-300 font-semibold text-sm tracking-wide hover:border-slate-400 hover:text-white transition-colors"
            >
              Latest News
            </a>
          </div>
        </motion.div>
      </footer>
    </div>
  );
}
