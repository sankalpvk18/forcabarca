import { notFound } from "next/navigation";
import Link from "next/link";
import squadData from "@/data/squad.json";

interface Props {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  return squadData.map((player) => ({
    id: player.id,
  }));
}

export default function PlayerPage({ params }: Props) {
  const player = squadData.find((p) => p.id === params.id);

  if (!player) {
    notFound();
  }

  // Split name for styled rendering
  const nameParts = player.name.split(" ");
  const primaryName = nameParts.length > 1 ? nameParts.slice(-1)[0] : "";
  const secondaryName =
    nameParts.length > 1 ? nameParts.slice(0, -1).join(" ") : player.name;

  // Related players from same position
  const relatedPlayers = squadData
    .filter((p) => p.position === player.position && p.id !== player.id)
    .slice(0, 2);

  // Static season stats for detail display
  const seasonStats = [
    { label: "Minutes Played", value: "2,845", percent: 78 },
    { label: "Shot Accuracy", value: "68%", percent: 68 },
    { label: "Pass Completion", value: "82%", percent: 82 },
    { label: "Aerial Duels Won", value: "54%", percent: 54 },
  ];

  // Technical attributes
  const technicalAttributes = [
    { label: "Finishing", value: 98 },
    { label: "Positioning", value: 96 },
    { label: "Heading", value: 92 },
  ];

  const overallRating = 91;

  return (
    <div className="min-h-screen">
      {/* ==================== HERO SECTION ==================== */}
      <div className="relative w-full h-[600px] overflow-hidden flex items-end">
        {/* Background layers */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30 blur-sm scale-105"
            style={{ backgroundImage: `url('${player.image}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-background-dark/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pb-12">
          <div className="flex flex-col md:flex-row items-end gap-8">
            {/* Player cutout image */}
            <div className="hidden md:block shrink-0">
              <div className="relative w-[450px] h-[450px]">
                <img
                  src={player.image}
                  alt={player.name}
                  className="w-full h-full object-cover object-top mask-fade rounded-lg"
                />
              </div>
            </div>

            {/* Player info */}
            <div className="flex-1 pb-4">
              {/* Position badge + number */}
              <div className="flex items-center gap-4 mb-4">
                <span className="bg-primary/20 text-primary border border-primary/30 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                  {player.position}
                </span>
                <span className="text-6xl font-black text-white/[0.08] italic leading-none select-none">
                  {player.number}
                </span>
              </div>

              {/* Name */}
              <h1 className="text-7xl md:text-8xl font-black uppercase leading-none tracking-tight mb-8">
                {secondaryName && (
                  <span className="block text-white">{secondaryName}</span>
                )}
                {primaryName && (
                  <span className="block text-primary">{primaryName}</span>
                )}
                {!primaryName && !secondaryName && (
                  <span className="block text-primary">{player.name}</span>
                )}
              </h1>

              {/* Hero stats row */}
              <div className="flex items-center gap-8">
                <div>
                  <div className="text-3xl font-bold italic text-white">
                    {player.goals}
                  </div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">
                    Goals
                  </div>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div>
                  <div className="text-3xl font-bold italic text-white">
                    {player.assists}
                  </div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">
                    Assists
                  </div>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div>
                  <div className="text-3xl font-bold italic text-white">
                    {player.appearances}
                  </div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">
                    Apps
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== MAIN CONTENT ==================== */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-10">
            {/* Biography */}
            <div className="glass-card rounded-xl p-8 border-l-4 border-l-primary">
              <h2 className="text-xl font-bold tracking-tight mb-5 uppercase">
                Biography
              </h2>
              <p className="text-slate-400 leading-relaxed text-[0.95rem]">
                {player.bio}
              </p>
            </div>

            {/* Season Stats Grid */}
            <div>
              <h2 className="text-xl font-bold tracking-tight mb-6 uppercase">
                Season Statistics
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {seasonStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="glass-card rounded-xl p-5 text-center"
                  >
                    <div className="text-2xl font-bold text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-[0.65rem] text-slate-500 uppercase tracking-wider mb-3">
                      {stat.label}
                    </div>
                    {/* Progress bar */}
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full"
                        style={{ width: `${stat.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Attributes */}
            <div>
              <h2 className="text-xl font-bold tracking-tight mb-6 uppercase">
                Technical Attributes
              </h2>
              <div className="glass-card rounded-xl p-8">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  {/* Bar chart */}
                  <div className="flex-1 w-full space-y-5">
                    {technicalAttributes.map((attr) => (
                      <div key={attr.label}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-slate-400 font-medium">
                            {attr.label}
                          </span>
                          <span className="text-sm font-bold text-white">
                            {attr.value}
                          </span>
                        </div>
                        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-primary via-primary to-accent-gold"
                            style={{ width: `${attr.value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* OVR circle */}
                  <div className="shrink-0 flex flex-col items-center">
                    <div className="relative w-28 h-28 rounded-full border-4 border-primary/40 flex items-center justify-center bg-primary/10">
                      <div className="text-center">
                        <div className="text-4xl font-black text-primary italic leading-none">
                          {overallRating}
                        </div>
                        <div className="text-[0.6rem] text-slate-500 uppercase tracking-widest mt-1">
                          OVR
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <div className="lg:sticky lg:top-28">
              <div className="space-y-6">
                {/* Player Info Card */}
                <div className="glass-card p-8 rounded-xl border-t-4 border-t-primary">
                  <h2 className="text-lg font-bold tracking-tight mb-6 uppercase">
                    Player Info
                  </h2>
                  <div className="space-y-0">
                    {[
                      { label: "Nationality", value: player.nationality },
                      { label: "Date of Birth", value: "--" },
                      {
                        label: "Height",
                        value: player.position === "Goalkeeper" ? "1.87m" : "1.81m",
                      },
                      { label: "Preferred Foot", value: "Right" },
                      { label: "Squad Number", value: `#${player.number}` },
                      { label: "Contract Until", value: "2026" },
                    ].map((item, index, arr) => (
                      <div
                        key={item.label}
                        className={`flex justify-between items-center py-3.5 ${
                          index < arr.length - 1
                            ? "border-b border-white/[0.05]"
                            : ""
                        }`}
                      >
                        <span className="text-sm text-slate-500">
                          {item.label}
                        </span>
                        <span className="text-sm font-semibold text-white">
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Social Icons Row */}
                <div className="flex justify-center gap-3">
                  {["instagram", "x", "tiktok"].map((platform) => (
                    <a
                      key={platform}
                      href="#"
                      className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-500 hover:bg-primary/20 hover:text-primary hover:border-primary/30 transition-all duration-300"
                      aria-label={platform}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        {platform === "instagram" && (
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        )}
                        {platform === "x" && (
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        )}
                        {platform === "tiktok" && (
                          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.69a8.18 8.18 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.12z" />
                        )}
                      </svg>
                    </a>
                  ))}
                </div>

                {/* Back to Squad Button */}
                <Link
                  href="/squad"
                  className="flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-primary/10 border border-primary/30 rounded-xl text-primary font-semibold text-sm hover:bg-primary/20 transition-all duration-300"
                >
                  <span className="material-symbols-outlined text-lg">
                    arrow_back
                  </span>
                  Back to First Team Squad
                </Link>

                {/* Related Players */}
                {relatedPlayers.length > 0 && (
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">
                      Related Players
                    </h3>
                    <div className="space-y-3">
                      {relatedPlayers.map((rp) => (
                        <Link
                          key={rp.id}
                          href={`/squad/${rp.id}`}
                          className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-primary/30 hover:bg-white/[0.04] transition-all duration-300 group"
                        >
                          <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-card-dark">
                            <img
                              src={rp.image}
                              alt={rp.name}
                              className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-bold text-white truncate group-hover:text-primary transition-colors">
                              {rp.name}
                            </div>
                            <div className="text-xs text-slate-500">
                              #{rp.number} &middot; {rp.position}
                            </div>
                          </div>
                          <span className="text-slate-600 group-hover:text-primary transition-colors">
                            &rsaquo;
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
