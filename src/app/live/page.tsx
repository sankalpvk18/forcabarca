"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface LiveMatch {
  id: number;
  utcDate: string;
  status: string;
  minute: number | null;
  homeTeam: {
    id: number;
    name: string;
  };
  awayTeam: {
    id: number;
    name: string;
  };
  score: {
    fullTime: {
      home: number | null;
      away: number | null;
    };
  };
}

export default function LivePage() {
  const [liveMatch, setLiveMatch] = useState<LiveMatch | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLiveData() {
      try {
        const response = await fetch("/api/live");
        if (!response.ok) throw new Error("Failed to fetch live data");
        const data = await response.json();
        if (data.matches && data.matches.length > 0) {
          setLiveMatch(data.matches[0]);
        } else {
          setLiveMatch(null);
        }
      } catch (err) {
        console.error("Error fetching live data:", err);
        setLiveMatch(null);
      } finally {
        setLoading(false);
      }
    }
    fetchLiveData();
    const interval = setInterval(fetchLiveData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen pt-28 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-barca-blue/30 border-t-barca-blue rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-white/30 text-sm font-body">
            Checking for live matches...
          </p>
        </div>
      </div>
    );
  }

  if (!liveMatch) {
    return (
      <div className="min-h-screen pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center pt-12"
          >
            {/* Decorative element */}
            <div className="relative w-28 h-28 mx-auto mb-8">
              <div className="absolute inset-0 bg-glow-blue opacity-40 blur-2xl" />
              <div className="relative w-full h-full rounded-full border border-white/[0.06] flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-white/20"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>

            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4">
              No Live Match
            </h1>
            <p className="text-white/30 font-body text-lg mb-12 max-w-md mx-auto">
              There is currently no FC Barcelona match in progress.
            </p>

            <div className="glass-card rounded-2xl p-8 md:p-10 max-w-lg mx-auto text-center">
              <span className="tag text-barca-gold border-barca-gold/30 mb-4 inline-block">
                Next Match
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight mb-2">
                FC Barcelona vs Real Madrid
              </h2>
              <p className="text-barca-blue font-body text-sm mb-4">
                El Clásico
              </p>
              <p className="text-white/30 font-body text-sm">
                Santiago Bernabéu &middot; March 15, 2024 &middot; 20:00 CET
              </p>
              <Link
                href="/fixtures"
                className="inline-block mt-6 btn-primary px-6 py-3 rounded-xl text-sm font-semibold tracking-wide uppercase"
              >
                <span className="relative z-10">View All Fixtures</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  const isBarcelonaHome = liveMatch.homeTeam.id === 81;
  const barcelonaScore = isBarcelonaHome
    ? liveMatch.score.fullTime.home
    : liveMatch.score.fullTime.away;
  const opponentScore = isBarcelonaHome
    ? liveMatch.score.fullTime.away
    : liveMatch.score.fullTime.home;
  const opponent = isBarcelonaHome
    ? liveMatch.awayTeam.name
    : liveMatch.homeTeam.name;

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Live Indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center justify-center mb-10"
        >
          <div className="flex items-center gap-2.5 bg-barca-red/20 border border-barca-red/30 px-5 py-2.5 rounded-full">
            <div className="relative">
              <div className="w-2.5 h-2.5 bg-barca-red rounded-full" />
              <div className="absolute inset-0 w-2.5 h-2.5 bg-barca-red rounded-full animate-ping" />
            </div>
            <span className="font-display text-sm font-bold uppercase tracking-wider">
              Live
            </span>
          </div>
        </motion.div>

        {/* Score Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="relative overflow-hidden rounded-2xl mb-10"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-barca-blue/20 to-barca-red/10" />
          <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-glow-blue opacity-20 blur-3xl" />

          <div className="relative p-8 md:p-12 border border-white/[0.06] rounded-2xl">
            {/* Teams */}
            <div className="flex items-center justify-between mb-8">
              <div
                className={`text-lg md:text-xl font-body ${
                  isBarcelonaHome ? "font-semibold text-white" : "text-white/60"
                }`}
              >
                FC Barcelona
              </div>
              <div
                className={`text-lg md:text-xl font-body ${
                  !isBarcelonaHome
                    ? "font-semibold text-white"
                    : "text-white/60"
                }`}
              >
                {opponent}
              </div>
            </div>

            {/* Score */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-6 md:gap-10">
                <span className="font-display text-7xl md:text-9xl font-bold">
                  {barcelonaScore !== null ? barcelonaScore : 0}
                </span>
                <span className="text-3xl text-white/15 font-body">–</span>
                <span className="font-display text-7xl md:text-9xl font-bold text-white/60">
                  {opponentScore !== null ? opponentScore : 0}
                </span>
              </div>
            </div>

            {/* Minute */}
            {liveMatch.minute && (
              <div className="text-center">
                <span className="font-display text-2xl font-bold text-barca-blue">
                  {liveMatch.minute}&apos;
                </span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Match Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-2xl p-6 md:p-8 mb-8"
        >
          <h2 className="font-display text-xl font-bold tracking-tight mb-8 text-center">
            Match Statistics
          </h2>

          <div className="space-y-6">
            {[
              { label: "Possession", home: 68, away: 32, suffix: "%" },
              { label: "Shots on Target", home: 8, away: 3, suffix: "" },
              { label: "Corners", home: 6, away: 2, suffix: "" },
              { label: "Fouls", home: 7, away: 12, suffix: "" },
            ].map((stat, index) => {
              const homeVal = isBarcelonaHome ? stat.home : stat.away;
              const awayVal = isBarcelonaHome ? stat.away : stat.home;
              const total = stat.home + stat.away;

              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="font-display text-sm font-bold">
                      {homeVal}
                      {stat.suffix}
                    </span>
                    <span className="text-[0.7rem] text-white/30 uppercase tracking-wider font-body">
                      {stat.label}
                    </span>
                    <span className="font-display text-sm font-bold text-white/50">
                      {awayVal}
                      {stat.suffix}
                    </span>
                  </div>
                  <div className="flex gap-1 h-1.5">
                    <div
                      className="bg-barca-blue rounded-full transition-all duration-700"
                      style={{
                        width: `${(homeVal / total) * 100}%`,
                      }}
                    />
                    <div
                      className="bg-white/10 rounded-full transition-all duration-700"
                      style={{
                        width: `${(awayVal / total) * 100}%`,
                      }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Auto-refresh */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-[0.7rem] text-white/20 font-body flex items-center justify-center gap-2"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-500/50 animate-pulse" />
          Updates automatically every 30 seconds
        </motion.p>
      </div>
    </div>
  );
}
