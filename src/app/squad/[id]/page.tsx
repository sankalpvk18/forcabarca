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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div
        className="relative h-[75vh] bg-cover bg-center"
        style={{ backgroundImage: `url('${player.image}')` }}
      >
        <div className="absolute inset-0 gradient-overlay" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-glow-blue opacity-20 blur-3xl" />

        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-16 w-full">
            <div className="flex items-end gap-6">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-barca-navy/80 backdrop-blur-sm border border-white/[0.08] flex items-center justify-center shrink-0">
                <span className="font-display text-3xl md:text-4xl font-bold text-gradient-barca">
                  {player.number}
                </span>
              </div>
              <div>
                <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95] mb-2">
                  {player.name}
                </h1>
                <p className="text-white/40 font-body text-lg uppercase tracking-wider">
                  {player.position}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bio */}
            <div className="glass-card rounded-2xl p-8">
              <h2 className="font-display text-xl font-bold tracking-tight mb-5">
                Biography
              </h2>
              <p className="text-white/40 font-body leading-[1.8] text-[0.95rem]">
                {player.bio}
              </p>
            </div>

            {/* Season Stats */}
            <div className="glass-card rounded-2xl p-8">
              <h2 className="font-display text-xl font-bold tracking-tight mb-8">
                Season Statistics
              </h2>
              <div className="grid grid-cols-3 gap-6">
                {[
                  { label: "Appearances", value: player.appearances },
                  { label: "Goals", value: player.goals },
                  { label: "Assists", value: player.assists },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="font-display text-4xl md:text-5xl font-bold text-gradient-barca mb-2">
                      {stat.value}
                    </div>
                    <div className="text-[0.65rem] text-white/30 uppercase tracking-[0.15em] font-body">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Player Info Card */}
            <div className="glass-card rounded-2xl p-6">
              <h2 className="font-display text-lg font-bold tracking-tight mb-6">
                Player Information
              </h2>
              <div className="space-y-0">
                {[
                  { label: "Position", value: player.position },
                  { label: "Number", value: player.number },
                  { label: "Age", value: player.age },
                  { label: "Nationality", value: player.nationality },
                ].map((item, index, arr) => (
                  <div
                    key={item.label}
                    className={`flex justify-between py-4 ${
                      index < arr.length - 1
                        ? "border-b border-white/[0.04]"
                        : ""
                    }`}
                  >
                    <span className="text-sm text-white/30 font-body">
                      {item.label}
                    </span>
                    <span className="text-sm font-body font-medium">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Back Link */}
            <Link
              href="/squad"
              className="block btn-primary text-center px-6 py-3.5 rounded-xl text-sm font-semibold tracking-wide uppercase"
            >
              <span className="relative z-10">Back to Squad</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
