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
      "https://api.football-data.org/v4/teams/81/matches",
      {
        headers: {
          "X-Auth-Token": apiKey,
        },
        next: { revalidate: 1800 }, // Cache for 30 minutes
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch fixtures");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching fixtures:", error);
    return NextResponse.json(
      { error: "Failed to fetch fixtures" },
      { status: 500 }
    );
  }
}
