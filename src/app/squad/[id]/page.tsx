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
        className="relative h-[70vh] bg-cover bg-center"
        style={{ backgroundImage: `url('${player.image}')` }}
      >
        <div className="absolute inset-0 gradient-overlay" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
            <div className="flex items-end gap-6">
              <div className="w-24 h-24 bg-barca-blue rounded-full flex items-center justify-center text-4xl font-bold">
                {player.number}
              </div>
              <div>
                <h1 className="text-5xl md:text-6xl font-bold mb-2">{player.name}</h1>
                <p className="text-2xl text-gray-300">{player.position}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Bio */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4">Biography</h2>
              <p className="text-gray-300 leading-relaxed">{player.bio}</p>
            </div>

            {/* Season Stats */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Season Statistics</h2>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-barca-blue mb-2">
                    {player.appearances}
                  </div>
                  <div className="text-gray-400 text-sm uppercase tracking-wider">
                    Appearances
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-barca-blue mb-2">
                    {player.goals}
                  </div>
                  <div className="text-gray-400 text-sm uppercase tracking-wider">
                    Goals
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-barca-blue mb-2">
                    {player.assists}
                  </div>
                  <div className="text-gray-400 text-sm uppercase tracking-wider">
                    Assists
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Player Info Card */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-bold mb-6">Player Information</h2>
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-white/10">
                  <span className="text-gray-400">Position</span>
                  <span className="font-medium">{player.position}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-white/10">
                  <span className="text-gray-400">Number</span>
                  <span className="font-medium">{player.number}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-white/10">
                  <span className="text-gray-400">Age</span>
                  <span className="font-medium">{player.age}</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-gray-400">Nationality</span>
                  <span className="font-medium">{player.nationality}</span>
                </div>
              </div>
            </div>

            {/* Back Link */}
            <Link
              href="/squad"
              className="block bg-barca-blue hover:bg-barca-red text-white text-center px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Back to Squad
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
