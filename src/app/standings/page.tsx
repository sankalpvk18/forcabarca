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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-barca-blue"></div>
          <p className="mt-4 text-gray-400">Loading standings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <p className="text-gray-400 text-sm">Using mock data instead</p>
        </div>
      </div>
    );
  }

  const barcelonaPosition = standings.find((team) => team.team.id === 81)?.position || 1;

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">La Liga Standings</h1>
          <p className="text-gray-400 text-lg">2023/24 Season</p>
        </motion.div>

        {/* Barcelona Position Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-barca-blue to-barca-red p-6 rounded-lg mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm mb-1">Barcelona Position</p>
              <p className="text-3xl font-bold">{barcelonaPosition}st Place</p>
            </div>
            <div className="text-right">
              <p className="text-white/80 text-sm mb-1">Points</p>
              <p className="text-3xl font-bold">
                {standings.find((team) => team.team.id === 81)?.points || 0}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Standings Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-black/30">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Pos
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Team
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                    P
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                    W
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                    D
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                    L
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                    GF
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                    GA
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                    GD
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Pts
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {standings.map((team, index) => {
                  const isBarcelona = team.team.id === 81 || team.team.name.includes("Barcelona");
                  return (
                    <motion.tr
                      key={team.team.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.02 }}
                      className={`${
                        isBarcelona
                          ? "bg-barca-blue/20 border-l-4 border-barca-blue"
                          : team.position <= 4
                          ? "bg-green-500/10"
                          : team.position >= 18
                          ? "bg-red-500/10"
                          : "hover:bg-white/5"
                      } transition-colors`}
                    >
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                        {team.position}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-sm font-medium">{team.team.name}</div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center text-sm">
                        {team.playedGames}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center text-sm">
                        {team.won}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center text-sm">
                        {team.draw}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center text-sm">
                        {team.lost}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center text-sm">
                        {team.goalsFor}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center text-sm">
                        {team.goalsAgainst}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center text-sm">
                        {team.goalDifference > 0 ? "+" : ""}
                        {team.goalDifference}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center text-sm font-bold">
                        {team.points}
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
          className="mt-8 flex flex-wrap gap-4 text-sm"
        >
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500/20 border border-green-500/50 rounded mr-2"></div>
            <span className="text-gray-400">Champions League</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-barca-blue/20 border border-barca-blue rounded mr-2"></div>
            <span className="text-gray-400">FC Barcelona</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-500/20 border border-red-500/50 rounded mr-2"></div>
            <span className="text-gray-400">Relegation Zone</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
