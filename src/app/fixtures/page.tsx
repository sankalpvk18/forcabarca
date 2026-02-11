"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Match {
  id: number;
  utcDate: string;
  status: string;
  matchday: number;
  stage: string;
  homeTeam: {
    id: number;
    name: string;
    crest?: string;
  };
  awayTeam: {
    id: number;
    name: string;
    crest?: string;
  };
  score: {
    fullTime: {
      home: number | null;
      away: number | null;
    };
  };
  competition: {
    name: string;
  };
}

export default function FixturesPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "upcoming" | "completed">("all");
  const [competition, setCompetition] = useState<string>("all");

  useEffect(() => {
    async function fetchFixtures() {
      try {
        const response = await fetch("/api/fixtures");
        if (!response.ok) throw new Error("Failed to fetch fixtures");
        const data = await response.json();

        if (data.matches) {
          setMatches(data.matches);
        }
      } catch (err) {
        console.error("Error fetching fixtures:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchFixtures();
  }, []);

  const filteredMatches = matches.filter((match) => {
    const statusFilter =
      filter === "all" ||
      (filter === "upcoming" && ["SCHEDULED", "TIMED"].includes(match.status)) ||
      (filter === "completed" && match.status === "FINISHED");

    const compFilter =
      competition === "all" || match.competition.name.includes(competition);

    return statusFilter && compFilter;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-barca-blue"></div>
          <p className="mt-4 text-gray-400">Loading fixtures...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Fixtures & Results</h1>
          <p className="text-gray-400 text-lg">FC Barcelona Match Schedule</p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 flex flex-wrap gap-4"
        >
          <div className="flex gap-2">
            {["all", "upcoming", "completed"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as typeof filter)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === f
                    ? "bg-barca-blue text-white"
                    : "bg-white/5 text-gray-400 hover:bg-white/10"
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          <select
            value={competition}
            onChange={(e) => setCompetition(e.target.value)}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-barca-blue"
          >
            <option value="all">All Competitions</option>
            <option value="Liga">La Liga</option>
            <option value="Champions">Champions League</option>
            <option value="Copa">Copa del Rey</option>
          </select>
        </motion.div>

        {/* Matches List */}
        <div className="space-y-4">
          {filteredMatches.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              No matches found for the selected filters.
            </div>
          ) : (
            filteredMatches.map((match, index) => {
              const matchDate = new Date(match.utcDate);
              const isUpcoming = ["SCHEDULED", "TIMED"].includes(match.status);
              const isBarcelonaHome = match.homeTeam.id === 81;

              return (
                <motion.div
                  key={match.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:border-barca-blue/50 transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    {/* Match Info */}
                    <div className="flex-1">
                      <div className="text-xs text-barca-blue uppercase tracking-wider mb-2">
                        {match.competition.name} • Matchday {match.matchday}
                      </div>

                      <div className="flex items-center gap-4 mb-2">
                        {/* Home Team */}
                        <div
                          className={`flex-1 text-right ${
                            isBarcelonaHome ? "font-bold" : ""
                          }`}
                        >
                          {match.homeTeam.name}
                        </div>

                        {/* Score or VS */}
                        <div className="text-2xl font-bold px-4">
                          {isUpcoming ? (
                            <span className="text-gray-400">vs</span>
                          ) : (
                            <span>
                              {match.score.fullTime.home} - {match.score.fullTime.away}
                            </span>
                          )}
                        </div>

                        {/* Away Team */}
                        <div
                          className={`flex-1 text-left ${
                            !isBarcelonaHome ? "font-bold" : ""
                          }`}
                        >
                          {match.awayTeam.name}
                        </div>
                      </div>

                      <div className="text-sm text-gray-400">
                        {isUpcoming
                          ? matchDate.toLocaleDateString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : matchDate.toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          isUpcoming
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-green-500/20 text-green-400"
                        }`}
                      >
                        {isUpcoming ? "Upcoming" : "Full Time"}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
