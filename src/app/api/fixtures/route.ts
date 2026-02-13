import { NextResponse } from "next/server";

const STATUS_MAP: Record<string, string> = {
  TBD: "SCHEDULED",
  NS: "TIMED",
  "1H": "IN_PLAY",
  HT: "IN_PLAY",
  "2H": "IN_PLAY",
  ET: "IN_PLAY",
  BT: "IN_PLAY",
  P: "IN_PLAY",
  FT: "FINISHED",
  AET: "FINISHED",
  PEN: "FINISHED",
  PST: "POSTPONED",
  CANC: "CANCELLED",
  ABD: "CANCELLED",
  SUSP: "SUSPENDED",
  INT: "SUSPENDED",
};

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
    const season = Math.min(now.getMonth() >= 7 ? now.getFullYear() : now.getFullYear() - 1, 2024);

    const response = await fetch(
      `https://v3.football.api-sports.io/fixtures?team=529&season=${season}`,
      {
        headers: {
          "x-apisports-key": apiKey,
        },
        next: { revalidate: 1800 },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch fixtures");
    }

    const data = await response.json();

    // Transform api-football format to match frontend expectations
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const matches = (data.response || []).map((entry: any) => {
      const roundStr = entry.league.round || "";
      const matchdayMatch = roundStr.match(/(\d+)/);
      const matchday = matchdayMatch ? parseInt(matchdayMatch[1], 10) : null;

      return {
        id: entry.fixture.id,
        utcDate: entry.fixture.date,
        status: STATUS_MAP[entry.fixture.status.short] || "SCHEDULED",
        matchday,
        stage: roundStr,
        homeTeam: {
          id: entry.teams.home.id,
          name: entry.teams.home.name,
          crest: entry.teams.home.logo,
        },
        awayTeam: {
          id: entry.teams.away.id,
          name: entry.teams.away.name,
          crest: entry.teams.away.logo,
        },
        score: {
          fullTime: {
            home: entry.goals.home,
            away: entry.goals.away,
          },
        },
        competition: {
          name: entry.league.name,
        },
      };
    });

    return NextResponse.json({ matches });
  } catch (error) {
    console.error("Error fetching fixtures:", error);
    return NextResponse.json(
      { error: "Failed to fetch fixtures" },
      { status: 500 }
    );
  }
}
