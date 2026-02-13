"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

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
      <div className="min-h-screen pt-28 flex items-center justify-center bg-background-dark">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-white/30 text-sm font-body tracking-wide">
            Loading standings...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-28 flex items-center justify-center bg-background-dark">
        <div className="text-center glass-panel rounded-xl p-10">
          <span className="material-icons text-accent-red text-4xl mb-4 block">
            error_outline
          </span>
          <p className="text-accent-red/80 mb-2 font-body text-lg font-semibold">
            {error}
          </p>
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

  const recentForm = ["W", "W", "D", "W", "L"];

  return (
    <div className="min-h-screen pt-28 pb-20 bg-background-dark">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Breadcrumb + Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-body text-white/30 mb-6">
            <Link
              href="/"
              className="hover:text-white/60 transition-colors duration-200"
            >
              Home
            </Link>
            <span className="material-icons text-[14px] text-white/20">
              chevron_right
            </span>
            <span className="text-white/60">Standings</span>
          </nav>

          {/* Title + Season */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h1 className="text-4xl font-extrabold tracking-tight">
              La Liga{" "}
              <span className="text-primary">Standings</span>
            </h1>
            <div className="flex items-center gap-2 bg-slate-800/50 border border-white/10 rounded-lg px-4 py-2">
              <span className="material-icons text-primary text-lg">
                calendar_today
              </span>
              <select className="bg-transparent text-sm font-body text-white/70 outline-none cursor-pointer">
                <option value="2024-25">2024/25 Season</option>
                <option value="2023-24">2023/24 Season</option>
                <option value="2022-23">2022/23 Season</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Hero Stats Card */}
        {barcaTeam && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12"
          >
            {/* Main Hero Card */}
            <div className="lg:col-span-2 bg-primary rounded-xl p-8 text-white min-h-[240px] relative overflow-hidden">
              {/* Background decorative elements */}
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
              <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-black/10 rounded-full translate-y-1/2 -translate-x-1/3" />

              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 mb-1">
                    FC Barcelona
                  </p>
                  <h2 className="text-6xl font-black italic tracking-tighter leading-none text-white/90">
                    LEAGUE
                    <br />
                    LEADERS
                  </h2>
                </div>

                <div className="flex items-end justify-between mt-6">
                  {/* Position */}
                  <div className="flex items-baseline gap-3">
                    <span className="text-7xl font-black leading-none">
                      {barcaTeam.position}
                    </span>
                    <span className="text-lg font-medium text-white/50 -mb-1">
                      {barcaTeam.position === 1
                        ? "st"
                        : barcaTeam.position === 2
                        ? "nd"
                        : barcaTeam.position === 3
                        ? "rd"
                        : "th"}
                    </span>
                  </div>

                  {/* Points Glass Overlay */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg px-5 py-3 border border-white/10">
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/50 mb-0.5">
                      Points
                    </p>
                    <span className="text-3xl font-black">
                      {barcaTeam.points}
                    </span>
                  </div>

                  {/* Recent Form */}
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/50 mb-2">
                      Recent Form
                    </p>
                    <div className="flex items-center gap-1.5">
                      {recentForm.map((result, i) => (
                        <div
                          key={i}
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black ${
                            result === "W"
                              ? "bg-green-500/80 text-white"
                              : result === "D"
                              ? "bg-amber-500/80 text-white"
                              : "bg-red-500/80 text-white"
                          }`}
                        >
                          {result}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Match Promo */}
            <div className="bg-slate-800/50 border border-primary/10 rounded-xl p-6 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-glow-blue opacity-10" />

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <span className="material-icons text-accent-gold text-sm">
                    star
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent-gold">
                    El Clasico
                  </span>
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div className="text-center">
                    <div className="w-14 h-14 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center mb-2 mx-auto">
                      <span className="text-sm font-black text-primary">
                        FCB
                      </span>
                    </div>
                    <p className="text-xs font-bold text-white/80">Barcelona</p>
                  </div>

                  <div className="text-center px-3">
                    <span className="text-lg font-black text-white/30">VS</span>
                    <p className="text-[9px] text-white/20 mt-1">Mar 15</p>
                  </div>

                  <div className="text-center">
                    <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-2 mx-auto">
                      <span className="text-sm font-black text-white/60">
                        RMA
                      </span>
                    </div>
                    <p className="text-xs font-bold text-white/50">
                      Real Madrid
                    </p>
                  </div>
                </div>

                <p className="text-[10px] text-white/30 text-center mb-4">
                  Santiago Bernabeu &middot; 20:00 CET
                </p>
              </div>

              <Link
                href="/fixtures"
                className="relative z-10 w-full block text-center bg-primary/20 hover:bg-primary/30 border border-primary/30 text-primary text-xs font-bold uppercase tracking-wider py-3 rounded-lg transition-all duration-300"
              >
                <span className="material-icons text-sm align-middle mr-1">
                  sports_soccer
                </span>
                Match Center
              </Link>
            </div>
          </motion.div>
        )}

        {/* Standings Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-800/40 border border-primary/10 rounded-xl overflow-hidden shadow-2xl shadow-black/20 mb-10"
        >
          {/* Table Header with Legend */}
          <div className="flex flex-wrap items-center justify-between px-6 py-4 border-b border-white/[0.06]">
            <h2 className="text-sm font-bold tracking-wide">
              <span className="material-icons text-primary text-base align-middle mr-2">
                leaderboard
              </span>
              Full Table
            </h2>
            <div className="flex items-center gap-5 text-[10px] font-body text-white/30">
              <div className="flex items-center gap-1.5">
                <div className="w-1 h-3 rounded-full bg-green-500/60" />
                <span>Champions League</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1 h-3 rounded-full bg-primary" />
                <span>FC Barcelona</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1 h-3 rounded-full bg-red-500/60" />
                <span>Relegation</span>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  {[
                    { key: "Pos", label: "#" },
                    { key: "Team", label: "Team" },
                    { key: "P", label: "P" },
                    { key: "W", label: "W" },
                    { key: "D", label: "D" },
                    { key: "L", label: "L" },
                    { key: "GF", label: "GF" },
                    { key: "GA", label: "GA" },
                    { key: "GD", label: "GD" },
                    { key: "Pts", label: "Pts" },
                  ].map((header) => (
                    <th
                      key={header.key}
                      className={`px-4 py-3 text-[10px] font-bold uppercase tracking-[0.15em] text-white/25 ${
                        header.key === "Team" ? "text-left" : "text-center"
                      }`}
                    >
                      {header.label}
                    </th>
                  ))}
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
                      className={`border-b border-white/[0.03] transition-colors duration-200 group ${
                        isBarcelona
                          ? "bg-primary/10 hover:bg-primary/15"
                          : isRelegation
                          ? "opacity-70 hover:opacity-100 hover:bg-red-500/[0.04]"
                          : isChampions
                          ? "hover:bg-green-500/[0.04]"
                          : "hover:bg-white/[0.02]"
                      }`}
                    >
                      {/* Position with left bar */}
                      <td className="px-4 py-3.5 text-center relative">
                        <div
                          className={`absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-r-full ${
                            isBarcelona
                              ? "bg-primary"
                              : isChampions
                              ? "bg-green-500/50"
                              : isRelegation
                              ? "bg-red-500/50"
                              : "bg-transparent"
                          }`}
                        />
                        <span
                          className={`font-body text-sm ${
                            isBarcelona
                              ? "text-primary font-bold"
                              : "text-white/40"
                          }`}
                        >
                          {team.position}
                        </span>
                      </td>

                      {/* Team name + crest */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          {team.team.crest && (
                            <img
                              src={team.team.crest}
                              alt={team.team.name}
                              className="w-6 h-6 object-contain"
                            />
                          )}
                          <span
                            className={`font-body text-sm ${
                              isBarcelona
                                ? "text-primary font-bold"
                                : "text-white/70 group-hover:text-white/90"
                            }`}
                          >
                            {team.team.name}
                          </span>
                        </div>
                      </td>

                      {/* Stats columns */}
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
                          className={`px-4 py-3.5 text-center text-sm font-body ${
                            isBarcelona ? "text-white/60" : "text-white/30"
                          }`}
                        >
                          {val}
                        </td>
                      ))}

                      {/* Goal difference */}
                      <td
                        className={`px-4 py-3.5 text-center text-sm font-body ${
                          team.goalDifference > 0
                            ? "text-green-400/70"
                            : team.goalDifference < 0
                            ? "text-red-400/70"
                            : "text-white/30"
                        }`}
                      >
                        {team.goalDifference > 0 ? "+" : ""}
                        {team.goalDifference}
                      </td>

                      {/* Points */}
                      <td className="px-4 py-3.5 text-center">
                        <span
                          className={`font-black text-xl ${
                            isBarcelona
                              ? "text-primary"
                              : "text-white/80"
                          } bg-primary/5 inline-flex items-center justify-center w-10 h-8 rounded`}
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

          {/* Stats Abbreviation Legend */}
          <div className="px-6 py-3 border-t border-white/[0.04] flex flex-wrap gap-x-5 gap-y-1 text-[9px] font-body text-white/20 uppercase tracking-wider">
            <span>P = Played</span>
            <span>W = Won</span>
            <span>D = Drawn</span>
            <span>L = Lost</span>
            <span>GF = Goals For</span>
            <span>GA = Goals Against</span>
            <span>GD = Goal Difference</span>
            <span>Pts = Points</span>
          </div>
        </motion.div>

        {/* Secondary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {/* Pichichi - Top Scorer */}
          <div className="glass-card rounded-xl p-6 group cursor-pointer">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-accent-gold/20 flex items-center justify-center">
                <span className="material-icons text-accent-gold text-sm">
                  emoji_events
                </span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/40">
                Pichichi
              </span>
            </div>
            <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">
              Robert Lewandowski
            </h3>
            <p className="text-white/40 text-xs font-body mb-3">FC Barcelona</p>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-accent-gold">19</span>
              <span className="text-xs text-white/30 font-body">goals</span>
            </div>
          </div>

          {/* Golden Glove */}
          <div className="glass-card rounded-xl p-6 group cursor-pointer">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="material-icons text-primary text-sm">
                  sports_handball
                </span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/40">
                Golden Glove
              </span>
            </div>
            <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">
              Marc-Andre ter Stegen
            </h3>
            <p className="text-white/40 text-xs font-body mb-3">FC Barcelona</p>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-primary">14</span>
              <span className="text-xs text-white/30 font-body">
                clean sheets
              </span>
            </div>
          </div>

          {/* Ticket Promo - spans 2 cols */}
          <div className="md:col-span-2 bg-gradient-to-r from-primary to-accent-red rounded-xl p-6 relative overflow-hidden group cursor-pointer">
            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
            <div className="absolute bottom-0 left-1/3 w-[100px] h-[100px] bg-white/5 rounded-full translate-y-1/2" />

            <div className="relative z-10 flex items-center justify-between h-full">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 mb-2">
                  Experience the Magic
                </p>
                <h3 className="text-2xl font-black tracking-tight mb-1">
                  Camp Nou Tickets
                </h3>
                <p className="text-sm text-white/60 font-body">
                  Secure your seat for the next home match
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 px-5 py-3 rounded-lg transition-all duration-300">
                <span className="material-icons text-base">
                  confirmation_number
                </span>
                <span className="text-xs font-bold uppercase tracking-wider">
                  Buy Tickets
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
