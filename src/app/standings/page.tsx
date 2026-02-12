"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TeamStanding {
  position: number;
  team: {
    id: number;
    name: string;
    crest: string;
  };
  playedGames: number;
  won: number;
  draw: number;
  lost: number;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
}

export default function StandingsPage() {
  const [standings, setStandings] = useState<TeamStanding[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStandings() {
      try {
        const response = await fetch("/api/standings");
        if (!response.ok) throw new Error("Failed to fetch standings");
        const data = await response.json();
        if (data.standings && data.standings[0]) {
          setStandings(data.standings[0].table);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }
    fetchStandings();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen pt-28 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-barca-blue/30 border-t-barca-blue rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-white/30 text-sm font-body">
            Loading standings...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-28 flex items-center justify-center">
        <div className="text-center">
          <p className="text-barca-red/80 mb-2 font-body">{error}</p>
          <p className="text-white/30 text-sm font-body">
            Using mock data instead
          </p>
        </div>
      </div>
    );
  }

  const barcaTeam = standings.find(
    (t) => t.team.id === 81 || t.team.name.includes("Barcelona")
  );

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-14"
        >
          <span className="tag text-barca-blue border-barca-blue/30 mb-4 inline-block">
            La Liga
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-3">
            Standings
          </h1>
          <p className="text-white/30 font-body text-lg">
            2023/24 Season Table
          </p>
        </motion.div>

        {/* Barcelona Position Hero */}
        {barcaTeam && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative overflow-hidden rounded-2xl mb-10"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-barca-blue/30 to-barca-red/20" />
            <div className="absolute inset-0 bg-glow-blue opacity-20" />
            <div className="relative flex items-center justify-between p-8 md:p-10">
              <div>
                <p className="text-[0.65rem] uppercase tracking-[0.2em] text-white/40 font-body mb-2">
                  Barcelona Position
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-5xl md:text-6xl font-bold">
                    {barcaTeam.position}
                  </span>
                  <span className="text-white/30 font-body text-lg">
                    {barcaTeam.position === 1
                      ? "st"
                      : barcaTeam.position === 2
                      ? "nd"
                      : barcaTeam.position === 3
                      ? "rd"
                      : "th"}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[0.65rem] uppercase tracking-[0.2em] text-white/40 font-body mb-2">
                  Points
                </p>
                <span className="font-display text-5xl md:text-6xl font-bold text-gradient-barca">
                  {barcaTeam.points}
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-2xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  {["Pos", "Team", "P", "W", "D", "L", "GF", "GA", "GD", "Pts"].map(
                    (header) => (
                      <th
                        key={header}
                        className={`px-4 py-4 text-[0.65rem] font-body font-semibold uppercase tracking-[0.15em] text-white/30 ${
                          header === "Team" ? "text-left" : "text-center"
                        }`}
                      >
                        {header}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {standings.map((team, index) => {
                  const isBarcelona =
                    team.team.id === 81 || team.team.name.includes("Barcelona");
                  const isChampions = team.position <= 4;
                  const isRelegation = team.position >= 18;

                  return (
                    <motion.tr
                      key={team.team.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.02 }}
                      className={`border-b border-white/[0.03] transition-colors duration-200 ${
                        isBarcelona
                          ? "bg-barca-blue/10 hover:bg-barca-blue/15"
                          : isChampions
                          ? "hover:bg-green-500/[0.04]"
                          : isRelegation
                          ? "hover:bg-red-500/[0.04]"
                          : "hover:bg-white/[0.02]"
                      }`}
                    >
                      <td className="px-4 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div
                            className={`w-1 h-6 rounded-full ${
                              isBarcelona
                                ? "bg-barca-blue"
                                : isChampions
                                ? "bg-green-500/40"
                                : isRelegation
                                ? "bg-red-500/40"
                                : "bg-transparent"
                            }`}
                          />
                          <span className="font-body text-sm text-white/60">
                            {team.position}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`font-body text-sm ${
                            isBarcelona
                              ? "text-white font-semibold"
                              : "text-white/70"
                          }`}
                        >
                          {team.team.name}
                        </span>
                      </td>
                      {[
                        team.playedGames,
                        team.won,
                        team.draw,
                        team.lost,
                        team.goalsFor,
                        team.goalsAgainst,
                      ].map((val, i) => (
                        <td
                          key={i}
                          className="px-4 py-4 text-center text-sm text-white/40 font-body"
                        >
                          {val}
                        </td>
                      ))}
                      <td className="px-4 py-4 text-center text-sm font-body text-white/40">
                        {team.goalDifference > 0 ? "+" : ""}
                        {team.goalDifference}
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span
                          className={`font-display text-sm font-bold ${
                            isBarcelona ? "text-barca-blue" : "text-white/80"
                          }`}
                        >
                          {team.points}
                        </span>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex flex-wrap gap-6 text-[0.7rem] font-body"
        >
          {[
            { color: "bg-green-500/40", label: "Champions League" },
            { color: "bg-barca-blue", label: "FC Barcelona" },
            { color: "bg-red-500/40", label: "Relegation Zone" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <div className={`w-1 h-4 rounded-full ${item.color}`} />
              <span className="text-white/30">{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
