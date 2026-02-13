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
      <div className="min-h-screen pt-28 flex items-center justify-center bg-background-dark">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-white/30 text-sm font-body tracking-wide">
            Checking for live matches...
          </p>
        </div>
      </div>
    );
  }

  if (!liveMatch) {
    return (
      <div className="min-h-screen pt-28 pb-20 bg-background-dark">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center pt-12"
          >
            {/* Clock Icon */}
            <div className="relative w-28 h-28 mx-auto mb-8">
              <div className="absolute inset-0 bg-glow-blue opacity-30 blur-2xl" />
              <div className="relative w-full h-full rounded-full glass-panel flex items-center justify-center">
                <span className="material-icons text-white/20 text-4xl">
                  schedule
                </span>
              </div>
            </div>

            <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              No Live Match
            </h1>
            <p className="text-white/30 font-body text-lg mb-12 max-w-md mx-auto">
              There is currently no FC Barcelona match in progress. Check back
              during matchday.
            </p>

            {/* Next Match Card */}
            <div className="glass-panel rounded-xl p-8 md:p-10 max-w-lg mx-auto">
              <div className="flex items-center justify-center gap-2 mb-5">
                <span className="material-icons text-accent-gold text-sm">
                  star
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent-gold">
                  Next Match
                </span>
              </div>

              <div className="flex items-center justify-center gap-8 mb-5">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center mb-2 mx-auto">
                    <span className="text-sm font-black text-primary">FCB</span>
                  </div>
                  <p className="text-xs font-bold text-white/80">Barcelona</p>
                </div>

                <div className="text-center">
                  <span className="text-xl font-black text-white/20">VS</span>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-2 mx-auto">
                    <span className="text-sm font-black text-white/50">RMA</span>
                  </div>
                  <p className="text-xs font-bold text-white/50">Real Madrid</p>
                </div>
              </div>

              <p className="text-primary font-body text-sm font-semibold mb-1">
                El Clasico
              </p>
              <p className="text-white/30 font-body text-xs mb-6">
                Santiago Bernabeu &middot; March 15, 2024 &middot; 20:00 CET
              </p>

              <Link
                href="/fixtures"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/80 text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-lg transition-all duration-300"
              >
                <span className="material-icons text-sm">calendar_month</span>
                View All Fixtures
              </Link>
            </div>

            {/* Auto-refresh notice */}
            <p className="mt-8 text-[10px] text-white/15 font-body flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500/50 animate-pulse" />
              Auto-refreshing every 30 seconds
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  const isBarcelonaHome = liveMatch.homeTeam.id === 529;
  const barcelonaScore = isBarcelonaHome
    ? liveMatch.score.fullTime.home
    : liveMatch.score.fullTime.away;
  const opponentScore = isBarcelonaHome
    ? liveMatch.score.fullTime.away
    : liveMatch.score.fullTime.home;
  const opponent = isBarcelonaHome
    ? liveMatch.awayTeam.name
    : liveMatch.homeTeam.name;

  const matchStats = [
    { label: "Possession", home: 68, away: 32, suffix: "%" },
    { label: "Shots on Target", home: 8, away: 3, suffix: "" },
    { label: "Corners", home: 6, away: 2, suffix: "" },
    { label: "Fouls", home: 7, away: 12, suffix: "" },
  ];

  const timelineEvents = [
    {
      minute: "72'",
      type: "yellow",
      description: "Yellow Card - Kounde",
      icon: "style",
    },
    {
      minute: "68'",
      type: "sub",
      description: "Substitution - Ferran Torres on for Raphinha",
      icon: "swap_horiz",
    },
    {
      minute: "58'",
      type: "goal",
      description: "GOAL! Lewandowski (Yamal assist)",
      icon: "sports_soccer",
    },
    {
      minute: "52'",
      type: "corner",
      description: "Corner - FC Barcelona",
      icon: "flag",
    },
    {
      minute: "45+2'",
      type: "whistle",
      description: "Half-Time",
      icon: "timer",
    },
    {
      minute: "38'",
      type: "goal",
      description: "GOAL! Lamine Yamal (Pedri assist)",
      icon: "sports_soccer",
    },
    {
      minute: "23'",
      type: "yellow",
      description: "Yellow Card - Valverde",
      icon: "style",
    },
    {
      minute: "12'",
      type: "corner",
      description: "Corner - Real Madrid",
      icon: "flag",
    },
    {
      minute: "1'",
      type: "whistle",
      description: "Kick-Off",
      icon: "play_arrow",
    },
  ];

  return (
    <div className="min-h-screen pt-28 pb-28 bg-background-dark">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* 12-col Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Area */}
          <div className="lg:col-span-8 space-y-6">
            {/* Hero Scoreboard */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-panel rounded-xl overflow-hidden p-8 min-h-[300px] relative"
            >
              {/* Background glow */}
              <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-glow-blue opacity-15 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-[300px] h-[200px] bg-glow-red opacity-10 blur-3xl" />

              <div className="relative z-10">
                {/* Top bar: LIVE badge + competition */}
                <div className="flex items-center justify-between mb-8">
                  <div className="bg-accent-red px-3 py-1 rounded-full text-xs font-bold animate-pulse-red flex items-center gap-1.5">
                    <div className="relative">
                      <div className="w-2 h-2 bg-white rounded-full" />
                      <div className="absolute inset-0 w-2 h-2 bg-white rounded-full animate-ping" />
                    </div>
                    LIVE
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/30">
                    La Liga &mdash; Matchday 24
                  </span>
                </div>

                {/* Teams + Score */}
                <div className="flex items-center justify-center gap-6 md:gap-10 mb-6">
                  {/* Home Team */}
                  <div className="text-center flex-1">
                    <div className="w-24 h-24 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl font-black text-primary">
                        {isBarcelonaHome ? "FCB" : opponent.substring(0, 3).toUpperCase()}
                      </span>
                    </div>
                    <h2 className="font-extrabold text-xl uppercase tracking-wide">
                      {isBarcelonaHome ? "FC Barcelona" : opponent}
                    </h2>
                    <p className="text-[10px] text-white/30 mt-1 uppercase tracking-wider">
                      Home
                    </p>
                  </div>

                  {/* Score */}
                  <div className="flex items-center gap-3 md:gap-5">
                    <span className="text-7xl font-black">
                      {isBarcelonaHome
                        ? barcelonaScore !== null
                          ? barcelonaScore
                          : 0
                        : opponentScore !== null
                        ? opponentScore
                        : 0}
                    </span>
                    <span className="text-3xl font-black text-white/15">:</span>
                    <span className="text-7xl font-black text-white/60">
                      {isBarcelonaHome
                        ? opponentScore !== null
                          ? opponentScore
                          : 0
                        : barcelonaScore !== null
                        ? barcelonaScore
                        : 0}
                    </span>
                  </div>

                  {/* Away Team */}
                  <div className="text-center flex-1">
                    <div className="w-24 h-24 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl font-black text-white/50">
                        {!isBarcelonaHome ? "FCB" : opponent.substring(0, 3).toUpperCase()}
                      </span>
                    </div>
                    <h2 className="font-extrabold text-xl uppercase tracking-wide text-white/60">
                      {!isBarcelonaHome ? "FC Barcelona" : opponent}
                    </h2>
                    <p className="text-[10px] text-white/30 mt-1 uppercase tracking-wider">
                      Away
                    </p>
                  </div>
                </div>

                {/* Minute pill */}
                {liveMatch.minute && (
                  <div className="text-center mb-4">
                    <span className="bg-primary/20 border border-primary/40 px-4 py-1 rounded-full text-sm font-bold text-primary inline-flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      {liveMatch.minute}&apos;
                    </span>
                  </div>
                )}

                {/* Goal scorers */}
                <div className="flex justify-center gap-10 text-xs font-medium text-white/50 mt-2">
                  <div className="text-right flex-1">
                    {isBarcelonaHome && (
                      <>
                        <p>Yamal 38&apos;</p>
                        <p>Lewandowski 58&apos;</p>
                      </>
                    )}
                  </div>
                  <div className="w-px bg-white/10" />
                  <div className="text-left flex-1">
                    {!isBarcelonaHome && (
                      <>
                        <p>Yamal 38&apos;</p>
                        <p>Lewandowski 58&apos;</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Match Statistics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="glass-panel rounded-xl p-8"
            >
              <div className="flex items-center gap-2 mb-8">
                <span className="material-icons text-primary text-lg">
                  analytics
                </span>
                <h2 className="text-sm font-bold tracking-wide uppercase">
                  Match Statistics
                </h2>
              </div>

              <div className="space-y-6">
                {matchStats.map((stat, index) => {
                  const homeVal = isBarcelonaHome ? stat.home : stat.away;
                  const awayVal = isBarcelonaHome ? stat.away : stat.home;
                  const total = stat.home + stat.away;

                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-sm text-white">
                          {homeVal}
                          {stat.suffix}
                        </span>
                        <span className="text-[10px] text-white/30 uppercase tracking-[0.15em] font-bold">
                          {stat.label}
                        </span>
                        <span className="font-bold text-sm text-white/50">
                          {awayVal}
                          {stat.suffix}
                        </span>
                      </div>
                      <div className="flex gap-1 h-2">
                        <div
                          className="bg-primary rounded-full transition-all duration-700"
                          style={{
                            width: `${(homeVal / total) * 100}%`,
                          }}
                        />
                        <div
                          className="bg-white/20 rounded-full transition-all duration-700"
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
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Match Timeline */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-panel rounded-xl p-6 h-[800px] flex flex-col"
            >
              <div className="flex items-center gap-2 mb-6">
                <span className="material-icons text-primary text-lg">
                  timeline
                </span>
                <h2 className="text-sm font-bold tracking-wide uppercase">
                  Match Timeline
                </h2>
              </div>

              {/* Events */}
              <div className="flex-1 overflow-y-auto pr-2 space-y-0">
                {timelineEvents.map((event, index) => (
                  <div key={index} className="flex items-start gap-4">
                    {/* Timeline line + circle */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          event.type === "goal"
                            ? "bg-accent-red"
                            : "bg-white/5 border border-white/10"
                        }`}
                      >
                        <span
                          className={`material-icons text-sm ${
                            event.type === "goal"
                              ? "text-white"
                              : event.type === "yellow"
                              ? "text-yellow-400"
                              : "text-white/40"
                          }`}
                        >
                          {event.icon}
                        </span>
                      </div>
                      {/* Connecting line */}
                      {index < timelineEvents.length - 1 && (
                        <div className="w-px h-16 bg-white/10" />
                      )}
                    </div>

                    {/* Event info */}
                    <div className="pt-1 pb-4">
                      <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
                        {event.minute}
                      </span>
                      <p
                        className={`text-xs font-medium mt-0.5 ${
                          event.type === "goal"
                            ? "text-white font-bold"
                            : "text-white/50"
                        }`}
                      >
                        {event.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Tactical View */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-panel rounded-xl p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="material-icons text-primary text-lg">
                  grid_on
                </span>
                <h2 className="text-sm font-bold tracking-wide uppercase">
                  Tactical View
                </h2>
              </div>

              {/* Pitch placeholder */}
              <div className="relative w-full aspect-[4/5] bg-green-900/20 border border-green-500/10 rounded-lg overflow-hidden">
                {/* Pitch lines */}
                <div className="absolute inset-4 border border-white/10 rounded-sm">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-1/5 border-b border-x border-white/10" />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-1/5 border-t border-x border-white/10" />
                  <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-white/10" />
                </div>

                {/* Overlay button */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <button className="bg-primary hover:bg-primary/80 text-white text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-lg transition-all duration-300 flex items-center gap-2">
                    <span className="material-icons text-sm">visibility</span>
                    VIEW LINEUPS
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Auto-refresh notice */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-[10px] text-white/15 font-body flex items-center justify-center gap-2 mt-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-500/50 animate-pulse" />
          Updates automatically every 30 seconds
        </motion.p>
      </div>

      {/* Fixed Bottom Stats Bar */}
      <div className="fixed bottom-0 left-0 w-full glass-panel border-t border-white/5 py-3 px-8 hidden md:flex items-center justify-center gap-12 z-50">
        {/* Atmosphere */}
        <div className="flex items-center gap-3">
          <span className="material-icons text-accent-red text-sm">
            graphic_eq
          </span>
          <div className="flex items-end gap-0.5 h-4">
            {[60, 80, 45, 90, 70, 55, 85, 65].map((h, i) => (
              <div
                key={i}
                className="w-0.5 bg-accent-red/60 rounded-full animate-pulse"
                style={{
                  height: `${h}%`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
          <div>
            <span className="text-[10px] font-bold text-white/50">
              78,432
            </span>
            <span className="text-[9px] text-white/25 ml-1">fans</span>
          </div>
        </div>

        <div className="w-px h-5 bg-white/10" />

        {/* Temperature */}
        <div className="flex items-center gap-2">
          <span className="material-icons text-accent-gold text-sm">
            thermostat
          </span>
          <span className="text-[10px] font-bold text-white/50">
            18°C
          </span>
          <span className="text-[9px] text-white/25">Clear</span>
        </div>

        <div className="w-px h-5 bg-white/10" />

        {/* Next Match */}
        <div className="flex items-center gap-2">
          <span className="material-icons text-primary text-sm">
            event
          </span>
          <span className="text-[10px] text-white/25">Next:</span>
          <span className="text-[10px] font-bold text-white/50">
            vs Atletico Madrid
          </span>
          <span className="text-[9px] text-white/25">
            &middot; Sat 20:00
          </span>
        </div>
      </div>
    </div>
  );
}
