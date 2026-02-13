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
          <div className="flex items-center gap-2 text-primary font-semibold mb-2 uppercase text-xs tracking-[0.2em]">
            <span className="w-8 h-[2px] bg-primary" />
            Season 2023/24
          </div>
          <h1 className="font-display text-5xl font-extrabold tracking-tight mb-3">
            Fixtures &{" "}
            <span className="text-primary">Results</span>
          </h1>
        </motion.div>

        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-10 glass-card p-4 rounded-xl flex flex-wrap items-center gap-6 border border-white/5"
        >
          {/* Status Filter */}
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1.5">
              Status
            </label>
            <select
              value={filter}
              onChange={(e) =>
                setFilter(e.target.value as "all" | "upcoming" | "completed")
              }
              className="px-4 py-2.5 bg-black/30 border border-white/10 rounded-lg text-sm text-white/80 font-body focus:outline-none focus:border-primary/50 transition-colors appearance-none cursor-pointer min-w-[160px]"
            >
              <option value="all">All Matches</option>
              <option value="upcoming">Upcoming</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Competition Filter */}
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1.5">
              Competition
            </label>
            <select
              value={competition}
              onChange={(e) => setCompetition(e.target.value)}
              className="px-4 py-2.5 bg-black/30 border border-white/10 rounded-lg text-sm text-white/80 font-body focus:outline-none focus:border-primary/50 transition-colors appearance-none cursor-pointer min-w-[180px]"
            >
              <option value="all">All Competitions</option>
              <option value="Liga">La Liga</option>
              <option value="Champions">Champions League</option>
              <option value="Copa">Copa del Rey</option>
            </select>
          </div>
        </motion.div>

        {/* Matches */}
        <div className="space-y-4">
          {filteredMatches.length === 0 ? (
            <div className="text-center py-20 text-white/30 font-body">
              No matches found for the selected filters.
            </div>
          ) : (
            filteredMatches.map((match, index) => {
              const matchDate = new Date(match.utcDate);
              const isUpcoming = ["SCHEDULED", "TIMED"].includes(match.status);
              const isBarcelonaHome = match.homeTeam.id === 529;

              return (
                <motion.div
                  key={match.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="glass-card rounded-xl overflow-hidden transition-all duration-300 group"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Left Info Panel */}
                    <div className="md:w-1/4 p-5 md:p-6 bg-white/[0.02] border-b md:border-b-0 md:border-r border-white/5 flex flex-col justify-center">
                      <span className="text-[10px] uppercase tracking-[0.15em] text-primary font-bold">
                        {match.competition.name}
                      </span>
                      <p className="text-[11px] text-slate-500 font-body mt-1">
                        Matchday {match.matchday}
                      </p>
                      <p className="text-xs text-slate-400 font-body mt-2">
                        {matchDate.toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                      {isUpcoming && (
                        <p className="text-xs text-slate-500 font-body mt-0.5">
                          {matchDate.toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      )}
                    </div>

                    {/* Center Teams & Score */}
                    <div className="flex-1 p-5 md:p-6 flex items-center justify-center gap-6">
                      {/* Home Team */}
                      <div className="flex-1 flex items-center justify-end gap-3">
                        <span
                          className={`font-bold text-lg text-right ${
                            isBarcelonaHome ? "text-white" : "text-slate-400"
                          }`}
                        >
                          {match.homeTeam.name}
                        </span>
                        <div
                          className={`w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0 ${
                            isBarcelonaHome
                              ? "border-l-4 border-l-primary"
                              : ""
                          }`}
                        >
                          {match.homeTeam.crest ? (
                            <img
                              src={match.homeTeam.crest}
                              alt={match.homeTeam.name}
                              className="w-6 h-6 object-contain"
                            />
                          ) : (
                            <span className="material-icons text-slate-600 text-sm">
                              shield
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Score / VS */}
                      <div className="w-28 text-center shrink-0">
                        {isUpcoming ? (
                          <div>
                            <span className="text-2xl font-light text-slate-600 uppercase tracking-widest">
                              VS
                            </span>
                            <div className="mt-1">
                              <span className="inline-block bg-primary/20 text-primary text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full">
                                Upcoming
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <span className="text-5xl font-black tracking-tight">
                              {match.score.fullTime.home}
                              <span className="text-slate-600 mx-1.5 text-3xl font-light">
                                -
                              </span>
                              {match.score.fullTime.away}
                            </span>
                            <div className="mt-1">
                              <span className="inline-block bg-green-500/20 text-green-400 text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full">
                                FT
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Away Team */}
                      <div className="flex-1 flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0 ${
                            !isBarcelonaHome
                              ? "border-l-4 border-l-primary"
                              : ""
                          }`}
                        >
                          {match.awayTeam.crest ? (
                            <img
                              src={match.awayTeam.crest}
                              alt={match.awayTeam.name}
                              className="w-6 h-6 object-contain"
                            />
                          ) : (
                            <span className="material-icons text-slate-600 text-sm">
                              shield
                            </span>
                          )}
                        </div>
                        <span
                          className={`font-bold text-lg ${
                            !isBarcelonaHome ? "text-white" : "text-slate-400"
                          }`}
                        >
                          {match.awayTeam.name}
                        </span>
                      </div>
                    </div>

                    {/* Right Action Panel */}
                    <div className="md:w-48 p-5 md:p-6 bg-white/[0.02] border-t md:border-t-0 md:border-l border-white/5 flex items-center justify-center">
                      {isUpcoming ? (
                        <button className="w-full bg-primary/20 hover:bg-primary/40 text-primary text-xs font-bold uppercase tracking-widest px-4 py-3 rounded-lg transition-colors">
                          Buy Tickets
                        </button>
                      ) : (
                        <button className="w-full bg-white/5 hover:bg-white/10 text-slate-400 text-xs font-bold uppercase tracking-widest px-4 py-3 rounded-lg transition-colors">
                          Match Center
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>

        {/* Load More */}
        {filteredMatches.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center mt-12"
          >
            <button className="glass-card hover:bg-white/10 px-12 py-4 rounded-full font-bold text-sm tracking-widest uppercase flex items-center gap-2 transition-colors">
              Load More
              <span className="material-icons text-lg">expand_more</span>
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
