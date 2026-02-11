"use client";

import { useEffect, useState } from "react";
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

    // Initial fetch
    fetchLiveData();

    // Poll every 30 seconds
    const interval = setInterval(fetchLiveData, 30000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-barca-blue"></div>
          <p className="mt-4 text-gray-400">Checking for live matches...</p>
        </div>
      </div>
    );
  }

  if (!liveMatch) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-white/5 rounded-full mb-6">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h1 className="text-4xl font-bold mb-4">No Live Match</h1>
              <p className="text-gray-400 text-lg mb-8">
                There is currently no FC Barcelona match in progress.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4">Next Match</h2>
              <p className="text-xl mb-2">FC Barcelona vs Real Madrid</p>
              <p className="text-barca-blue">El Clásico</p>
              <p className="text-gray-400 mt-4">
                Santiago Bernabéu • March 15, 2024 • 20:00 CET
              </p>
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
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Live Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center mb-8"
        >
          <div className="flex items-center gap-2 bg-red-500 px-4 py-2 rounded-full">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            <span className="font-bold">LIVE</span>
          </div>
        </motion.div>

        {/* Score Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-barca-blue/20 to-barca-red/20 backdrop-blur-sm border border-barca-blue/30 rounded-2xl p-8 mb-8"
        >
          <div className="text-center mb-6">
            <span className="text-6xl font-bold">
              {barcelonaScore !== null ? barcelonaScore : 0}
            </span>
            <span className="text-4xl text-gray-400 mx-8">-</span>
            <span className="text-6xl font-bold">
              {opponentScore !== null ? opponentScore : 0}
            </span>
          </div>

          <div className="flex items-center justify-between text-xl mb-4">
            <div className={`flex-1 text-center ${isBarcelonaHome ? "font-bold" : ""}`}>
              FC Barcelona
            </div>
            <div className={`flex-1 text-center ${!isBarcelonaHome ? "font-bold" : ""}`}>
              {opponent}
            </div>
          </div>

          {liveMatch.minute && (
            <div className="text-center">
              <span className="text-2xl font-bold text-barca-blue">
                {liveMatch.minute}&apos;
              </span>
            </div>
          )}
        </motion.div>

        {/* Match Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 mb-8"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Match Statistics</h2>

          <div className="space-y-4">
            {[
              { label: "Possession", home: 68, away: 32 },
              { label: "Shots on Target", home: 8, away: 3 },
              { label: "Corners", home: 6, away: 2 },
              { label: "Fouls", home: 7, away: 12 },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold">{isBarcelonaHome ? stat.home : stat.away}</span>
                  <span className="text-gray-400 text-sm">{stat.label}</span>
                  <span className="font-bold">{isBarcelonaHome ? stat.away : stat.home}</span>
                </div>
                <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-barca-blue"
                    style={{
                      width: `${
                        isBarcelonaHome
                          ? (stat.home / (stat.home + stat.away)) * 100
                          : (stat.away / (stat.home + stat.away)) * 100
                      }%`,
                    }}
                  ></div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Auto-refresh Notice */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-gray-400"
        >
          Updates automatically every 30 seconds
        </motion.p>
      </div>
    </div>
  );
}
