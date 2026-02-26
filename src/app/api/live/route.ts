import { NextResponse } from "next/server";

// Mark as dynamic to prevent static rendering at build time
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const apiKey = process.env.FOOTBALL_DATA_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const response = await fetch(
      "https://v3.football.api-sports.io/fixtures?team=529&live=all",
      {
        headers: {
          "x-apisports-key": apiKey,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch live match data");
    }

    const data = await response.json();

    // Transform api-football format to match frontend expectations
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const matches = (data.response || []).map((entry: any) => ({
      id: entry.fixture.id,
      utcDate: entry.fixture.date,
      status: "IN_PLAY",
      minute: entry.fixture.status.elapsed,
      homeTeam: {
        id: entry.teams.home.id,
        name: entry.teams.home.name,
      },
      awayTeam: {
        id: entry.teams.away.id,
        name: entry.teams.away.name,
      },
      score: {
        fullTime: {
          home: entry.goals.home,
          away: entry.goals.away,
        },
      },
    }));

    return NextResponse.json({ matches });
  } catch (error) {
    console.error("Error fetching live data:", error);
    return NextResponse.json(
      { error: "Failed to fetch live match data" },
      { status: 500 }
    );
  }
}
