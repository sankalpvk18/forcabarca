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
      <div className="min-h-screen pt-28 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-barca-blue/30 border-t-barca-blue rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-white/30 text-sm font-body">
            Loading fixtures...
          </p>
        </div>
      </div>
    );
  }

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
            Schedule
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-3">
            Fixtures & Results
          </h1>
          <p className="text-white/30 font-body text-lg">
            FC Barcelona Match Schedule
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-10 flex flex-wrap items-center gap-4"
        >
          <div className="flex gap-1 p-1 bg-white/[0.03] rounded-xl border border-white/[0.06]">
            {(["all", "upcoming", "completed"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-[0.75rem] font-body font-medium uppercase tracking-wider transition-all duration-300 ${
                  filter === f
                    ? "bg-barca-blue/20 text-white border border-barca-blue/30"
                    : "text-white/30 hover:text-white/60 border border-transparent"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <select
            value={competition}
            onChange={(e) => setCompetition(e.target.value)}
            className="px-4 py-2.5 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm text-white/60 font-body focus:outline-none focus:border-barca-blue/30 transition-colors appearance-none cursor-pointer"
          >
            <option value="all">All Competitions</option>
            <option value="Liga">La Liga</option>
            <option value="Champions">Champions League</option>
            <option value="Copa">Copa del Rey</option>
          </select>
        </motion.div>

        {/* Matches */}
        <div className="space-y-3">
          {filteredMatches.length === 0 ? (
            <div className="text-center py-20 text-white/30 font-body">
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
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="glass-card rounded-xl p-5 md:p-6 group"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    {/* Competition tag */}
                    <div className="md:w-48 shrink-0">
                      <span className="text-[0.6rem] uppercase tracking-[0.15em] text-white/25 font-body">
                        {match.competition.name}
                      </span>
                      <p className="text-[0.7rem] text-white/20 font-body mt-0.5">
                        Matchday {match.matchday}
                      </p>
                    </div>

                    {/* Teams & Score */}
                    <div className="flex-1 flex items-center gap-4">
                      <div
                        className={`flex-1 text-right font-body text-sm ${
                          isBarcelonaHome
                            ? "text-white font-semibold"
                            : "text-white/60"
                        }`}
                      >
                        {match.homeTeam.name}
                      </div>

                      <div className="w-24 text-center shrink-0">
                        {isUpcoming ? (
                          <span className="text-white/20 text-sm font-body">
                            vs
                          </span>
                        ) : (
                          <span className="font-display text-xl font-bold tracking-tight">
                            {match.score.fullTime.home}{" "}
                            <span className="text-white/20 mx-1">–</span>{" "}
                            {match.score.fullTime.away}
                          </span>
                        )}
                      </div>

                      <div
                        className={`flex-1 text-left font-body text-sm ${
                          !isBarcelonaHome
                            ? "text-white font-semibold"
                            : "text-white/60"
                        }`}
                      >
                        {match.awayTeam.name}
                      </div>
                    </div>

                    {/* Date & Status */}
                    <div className="flex items-center gap-3 md:w-56 shrink-0 md:justify-end">
                      <span className="text-[0.7rem] text-white/20 font-body">
                        {isUpcoming
                          ? matchDate.toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : matchDate.toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                      </span>
                      <span
                        className={`tag ${
                          isUpcoming
                            ? "text-barca-blue border-barca-blue/30"
                            : "text-green-400 border-green-500/30"
                        }`}
                      >
                        {isUpcoming ? "Upcoming" : "FT"}
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
