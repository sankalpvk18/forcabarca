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

    const response = await fetch(
      "https://api.football-data.org/v4/teams/81/matches?status=LIVE",
      {
        headers: {
          "X-Auth-Token": apiKey,
        },
        cache: "no-store", // Don't cache live data
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch live match data");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching live data:", error);
    return NextResponse.json(
      { error: "Failed to fetch live match data" },
      { status: 500 }
    );
  }
}
