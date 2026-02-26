import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiKey = process.env.FOOTBALL_DATA_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    // Determine current season (Aug+ = current year, otherwise previous year)
    // Free api-football plan caps at 2024
    const now = new Date();
    const season = Math.min(now.getMonth() >= 7 ? now.getFullYear() : now.getFullYear() - 1, 2024);

    const response = await fetch(
      `https://v3.football.api-sports.io/standings?league=140&season=${season}`,
      {
        headers: {
          "x-apisports-key": apiKey,
        },
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch standings");
    }

    const data = await response.json();
    const leagueData = data.response?.[0]?.league;

    if (!leagueData?.standings?.[0]) {
      throw new Error("No standings data available");
    }

    // Transform api-football format to match frontend expectations
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const table = leagueData.standings[0].map((entry: any) => ({
      position: entry.rank,
      team: {
        id: entry.team.id,
        name: entry.team.name,
        crest: entry.team.logo,
      },
      playedGames: entry.all.played,
      won: entry.all.win,
      draw: entry.all.draw,
      lost: entry.all.lose,
      points: entry.points,
      goalsFor: entry.all.goals.for,
      goalsAgainst: entry.all.goals.against,
      goalDifference: entry.goalsDiff,
    }));

    return NextResponse.json({ standings: [{ table }] });
  } catch (error) {
    console.error("Error fetching standings:", error);
    return NextResponse.json(
      { error: "Failed to fetch standings" },
      { status: 500 }
    );
  }
}
