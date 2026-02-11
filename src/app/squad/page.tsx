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
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">First Team Squad</h1>
          <p className="text-gray-400 text-lg">
            2023/24 Season - FC Barcelona Players
          </p>
        </motion.div>

        {/* Position Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 flex flex-wrap gap-2"
        >
          {positions.map((position) => (
            <button
              key={position}
              onClick={() => setSelectedPosition(position)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedPosition === position
                  ? "bg-barca-blue text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              }`}
            >
              {position}
            </button>
          ))}
        </motion.div>

        {/* Players Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPlayers.map((player, index) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link href={`/squad/${player.id}`}>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden hover:border-barca-blue/50 transition-all hover:transform hover:-translate-y-2 group">
                  {/* Player Image */}
                  <div className="relative h-64 bg-gradient-to-br from-barca-blue/20 to-barca-red/20">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url('${player.image}')` }}
                    />
                    <div className="absolute top-4 right-4 w-12 h-12 bg-barca-blue rounded-full flex items-center justify-center font-bold text-xl">
                      {player.number}
                    </div>
                  </div>

                  {/* Player Info */}
                  <div className="p-4">
                    <h3 className="text-lg font-bold mb-1 group-hover:text-barca-blue transition-colors">
                      {player.name}
                    </h3>
                    <p className="text-sm text-gray-400 mb-3">{player.position}</p>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{player.nationality}</span>
                      <span>{player.age} years</span>
                    </div>

                    {/* Stats */}
                    <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-3 gap-2 text-center">
                      <div>
                        <div className="text-xs text-gray-400">Apps</div>
                        <div className="font-bold text-sm">{player.appearances}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400">Goals</div>
                        <div className="font-bold text-sm">{player.goals}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400">Assists</div>
                        <div className="font-bold text-sm">{player.assists}</div>
                      </div>
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
