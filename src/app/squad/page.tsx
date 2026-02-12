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
            2023/24
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-3">
            First Team Squad
          </h1>
          <p className="text-white/30 font-body text-lg">
            FC Barcelona Players
          </p>
        </motion.div>

        {/* Position Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-10 flex flex-wrap gap-2"
        >
          {positions.map((position) => (
            <button
              key={position}
              onClick={() => setSelectedPosition(position)}
              className={`px-4 py-2 rounded-xl text-[0.75rem] font-body font-medium uppercase tracking-wider transition-all duration-300 ${
                selectedPosition === position
                  ? "bg-barca-blue/20 text-white border border-barca-blue/30"
                  : "text-white/30 hover:text-white/60 border border-white/[0.06] hover:border-white/[0.1]"
              }`}
            >
              {position}
            </button>
          ))}
        </motion.div>

        {/* Players Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredPlayers.map((player, index) => (
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
                <div className="glass-card-glow rounded-2xl overflow-hidden group">
                  {/* Player Image */}
                  <div className="relative h-64 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-barca-blue/10 to-barca-red/10" />
                    <div
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                      style={{ backgroundImage: `url('${player.image}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-barca-navy via-transparent to-transparent" />

                    {/* Number badge */}
                    <div className="absolute top-4 right-4">
                      <div className="w-10 h-10 rounded-xl bg-barca-navy/80 backdrop-blur-sm border border-white/[0.08] flex items-center justify-center">
                        <span className="font-display text-sm font-bold text-barca-blue">
                          {player.number}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Player Info */}
                  <div className="p-5">
                    <h3 className="font-display text-base font-bold mb-1 group-hover:text-barca-blue-light transition-colors duration-300">
                      {player.name}
                    </h3>
                    <p className="text-[0.7rem] text-white/30 font-body uppercase tracking-wider mb-4">
                      {player.position}
                    </p>

                    <div className="flex items-center justify-between text-[0.7rem] text-white/20 font-body mb-4">
                      <span>{player.nationality}</span>
                      <span>{player.age} yrs</span>
                    </div>

                    {/* Stats */}
                    <div className="section-divider mb-4" />
                    <div className="grid grid-cols-3 gap-3 text-center">
                      {[
                        { label: "Apps", value: player.appearances },
                        { label: "Goals", value: player.goals },
                        { label: "Assists", value: player.assists },
                      ].map((stat) => (
                        <div key={stat.label}>
                          <div className="font-display text-sm font-bold text-white/80">
                            {stat.value}
                          </div>
                          <div className="text-[0.6rem] text-white/20 uppercase tracking-wider font-body mt-0.5">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
