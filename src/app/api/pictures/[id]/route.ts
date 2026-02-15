import { NextRequest, NextResponse } from "next/server";
import { getCache, setCache } from "@/lib/cache";
import { scrapeGalleryImages, GalleryDetail } from "@/lib/scraper";

const CACHE_TTL = 6 * 60 * 60 * 1000; // 6 hours

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const slug = request.nextUrl.searchParams.get("slug") || "";
    const refresh = request.nextUrl.searchParams.get("refresh") === "true";
    const cacheKey = `gallery-${id}`;

    if (!refresh) {
      const cached = getCache<GalleryDetail>(cacheKey);
      if (cached) {
        return NextResponse.json({ gallery: cached, fromCache: true });
      }
    }

    if (!slug) {
      return NextResponse.json(
        { error: "Missing slug parameter" },
        { status: 400 }
      );
    }

    const gallery = await scrapeGalleryImages(id, slug);

    if (gallery.images.length > 0) {
      setCache(cacheKey, gallery, CACHE_TTL);
    }

    return NextResponse.json({ gallery, fromCache: false });
  } catch (error) {
    console.error("Error fetching gallery images:", error);
    const id = params.id;
    const stale = getCache<GalleryDetail>(`gallery-${id}`);
    if (stale) {
      return NextResponse.json({ gallery: stale, fromCache: true, stale: true });
    }
    return NextResponse.json(
      { error: "Failed to fetch gallery images" },
      { status: 500 }
    );
  }
}
