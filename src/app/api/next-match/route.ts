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

    // Free api-football plan caps at 2024
    const now = new Date();
    const season = Math.min(
      now.getMonth() >= 7 ? now.getFullYear() : now.getFullYear() - 1,
      2024
    );

    const response = await fetch(
      `https://v3.football.api-sports.io/fixtures?team=529&season=${season}`,
      {
        headers: {
          "x-apisports-key": apiKey,
        },
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch fixtures");
    }

    const data = await response.json();
    const fixtures = data.response || [];

    const nowMs = Date.now();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const transform = (entry: any) => ({
      id: entry.fixture.id,
      date: entry.fixture.date,
      status: entry.fixture.status.short,
      homeTeam: {
        id: entry.teams.home.id,
        name: entry.teams.home.name,
        logo: entry.teams.home.logo,
      },
      awayTeam: {
        id: entry.teams.away.id,
        name: entry.teams.away.name,
        logo: entry.teams.away.logo,
      },
      score: {
        home: entry.goals.home,
        away: entry.goals.away,
      },
      competition: entry.league.name,
      round: entry.league.round,
      venue: {
        name: entry.fixture.venue?.name || null,
        city: entry.fixture.venue?.city || null,
      },
    });

    // Find next upcoming match (NS or TBD)
    const upcoming = fixtures
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .filter((f: any) => {
        const status = f.fixture.status.short;
        return status === "NS" || status === "TBD";
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .sort(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (a: any, b: any) =>
          new Date(a.fixture.date).getTime() -
          new Date(b.fixture.date).getTime()
      );

    if (upcoming.length > 0) {
      return NextResponse.json({
        type: "upcoming",
        match: transform(upcoming[0]),
      });
    }

    // No upcoming match — return the most recent completed match
    const completed = fixtures
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .filter((f: any) => {
        const status = f.fixture.status.short;
        return (
          (status === "FT" || status === "AET" || status === "PEN") &&
          new Date(f.fixture.date).getTime() <= nowMs
        );
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .sort(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (a: any, b: any) =>
          new Date(b.fixture.date).getTime() -
          new Date(a.fixture.date).getTime()
      );

    if (completed.length > 0) {
      return NextResponse.json({
        type: "completed",
        match: transform(completed[0]),
      });
    }

    return NextResponse.json({ type: "none", match: null });
  } catch (error) {
    console.error("Error fetching next match:", error);
    return NextResponse.json(
      { error: "Failed to fetch next match" },
      { status: 500 }
    );
  }
}
