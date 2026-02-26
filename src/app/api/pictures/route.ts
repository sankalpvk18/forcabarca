import { NextResponse } from 'next/server';
import { getGalleryList, isDataStale } from '@/lib/storage';

// Mark as dynamic to prevent static rendering at build time
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Get gallery list from Blob storage
    const data = await getGalleryList();

    if (!data) {
      return NextResponse.json(
        {
          error: 'No gallery data available',
          message:
            'Galleries are being scraped. Please check back in a few minutes.',
        },
        { status: 503 }
      );
    }

    // Check if data is stale (older than 24 hours)
    const stale = isDataStale(data.lastUpdated, 24);

    return NextResponse.json({
      galleries: data.galleries,
      lastUpdated: data.lastUpdated,
      stale,
      count: data.scrapedCount,
    });
  } catch (error) {
    console.error('[API] Error fetching galleries:', error);
    return NextResponse.json(
      { error: 'Failed to fetch galleries' },
      { status: 500 }
    );
  }
}
