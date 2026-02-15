import { NextRequest, NextResponse } from "next/server";
import { getCache, setCache } from "@/lib/cache";
import { scrapeGalleryList, GalleryItem } from "@/lib/scraper";

const CACHE_KEY = "galleries-list";
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

export async function GET(request: NextRequest) {
  try {
    const refresh = request.nextUrl.searchParams.get("refresh") === "true";

    if (!refresh) {
      const cached = getCache<GalleryItem[]>(CACHE_KEY);
      if (cached) {
        return NextResponse.json({ galleries: cached, fromCache: true });
      }
    }

    const galleries = await scrapeGalleryList();

    if (galleries.length > 0) {
      setCache(CACHE_KEY, galleries, CACHE_TTL);
    }

    return NextResponse.json({ galleries, fromCache: false });
  } catch (error) {
    console.error("Error fetching galleries:", error);
    // Try to return stale cache on error
    const stale = getCache<GalleryItem[]>(CACHE_KEY);
    if (stale) {
      return NextResponse.json({ galleries: stale, fromCache: true, stale: true });
    }
    return NextResponse.json(
      { error: "Failed to fetch galleries" },
      { status: 500 }
    );
  }
}
