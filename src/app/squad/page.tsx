"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import squadData from "@/data/squad.json";

const positions = ["All", "Goalkeeper", "Defender", "Midfielder", "Forward"];

export default function SquadPage() {
  const [selectedPosition, setSelectedPosition] = useState<string>("All");

  const filteredPlayers =
    selectedPosition === "All"
      ? squadData
      : squadData.filter((player) => player.position === selectedPosition);

  const [visibleCount, setVisibleCount] = useState(12);
  const displayedPlayers = filteredPlayers.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPlayers.length;

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            {/* Season Badge */}
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-gold/10 border border-accent-gold/30 text-accent-gold text-xs font-bold uppercase tracking-widest mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-gold opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-gold" />
              </span>
              Season 2023/24
            </span>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter uppercase italic">
              First Team{" "}
              <span className="text-primary">Squad</span>
            </h1>
          </div>

          <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
            Explore the full roster of FC Barcelona first team players for the current campaign.
          </p>
        </motion.div>

        {/* Position Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex flex-wrap gap-2 p-1.5 bg-card-dark/50 rounded-xl border border-primary/10">
            {positions.map((position) => (
              <button
                key={position}
                onClick={() => {
                  setSelectedPosition(position);
                  setVisibleCount(12);
                }}
                className={
                  selectedPosition === position
                    ? "px-6 py-2.5 rounded-lg bg-primary text-white font-semibold text-sm shadow-lg shadow-primary/25 transition-all duration-300"
                    : "px-6 py-2.5 rounded-lg hover:bg-primary/10 text-slate-400 font-semibold text-sm transition-all duration-300"
                }
              >
                {position}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Player Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayedPlayers.map((player, index) => {
            const nameParts = player.name.split(" ");
            const firstName = nameParts.slice(0, -1).join(" ") || "";
            const lastName = nameParts[nameParts.length - 1];

            return (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.04,
                  duration: 0.5,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <Link href={`/squad/${player.id}`}>
                  <div className="group relative bg-card-dark rounded-xl overflow-hidden border border-transparent hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20">
                    {/* Jersey Number Watermark */}
                    <span className="absolute top-4 right-6 text-7xl font-black text-primary/10 group-hover:text-primary/30 transition-colors italic z-10 select-none pointer-events-none">
                      {player.number}
                    </span>

                    {/* Player Image Area */}
                    <div className="player-card-gradient pt-10 px-4">
                      <div className="relative aspect-[4/5] overflow-hidden">
                        <img
                          src={player.image}
                          alt={player.name}
                          className="mask-fade w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                    </div>

                    {/* Info Section */}
                    <div className="px-5 pb-5 -mt-2 relative z-10">
                      <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">
                        {player.position}
                      </p>
                      <h3 className="text-2xl font-bold uppercase leading-tight mb-3">
                        {firstName && (
                          <span className="block text-slate-400 text-sm font-semibold">
                            {firstName}
                          </span>
                        )}
                        <span className="block">{lastName}</span>
                      </h3>

                      {/* Stats Row */}
                      <div className="stats-border pt-4 flex justify-between items-center text-center">
                        <div>
                          <div className="text-lg font-bold text-white/90">
                            {player.appearances}
                          </div>
                          <div className="text-[0.6rem] text-slate-500 uppercase tracking-wider mt-0.5">
                            Apps
                          </div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-accent-gold">
                            {player.goals}
                          </div>
                          <div className="text-[0.6rem] text-slate-500 uppercase tracking-wider mt-0.5">
                            Goals
                          </div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-white/90">
                            {player.assists}
                          </div>
                          <div className="text-[0.6rem] text-slate-500 uppercase tracking-wider mt-0.5">
                            Assists
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Load More / Count Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-14 flex flex-col items-center gap-4"
        >
          {hasMore && (
            <button
              onClick={() => setVisibleCount((prev) => prev + 8)}
              className="group flex items-center gap-3 px-8 py-4 bg-primary rounded-full font-bold text-lg text-white hover:bg-primary/90 shadow-xl shadow-primary/40 transition-all duration-300"
            >
              Load More Players
              <span className="material-symbols-outlined text-xl group-hover:translate-y-0.5 transition-transform">
                keyboard_arrow_down
              </span>
            </button>
          )}
          <p className="text-slate-500 text-sm">
            Showing{" "}
            <span className="text-white font-semibold">
              {displayedPlayers.length}
            </span>{" "}
            of{" "}
            <span className="text-white font-semibold">
              {filteredPlayers.length}
            </span>{" "}
            players
          </p>
        </motion.div>
      </div>
    </div>
  );
}
