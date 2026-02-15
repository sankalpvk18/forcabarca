import { NextRequest, NextResponse } from 'next/server';
import { getGalleryDetail, isDataStale } from '@/lib/storage';

// Mark as dynamic to prevent static rendering at build time
export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    // Get gallery detail from Blob storage
    const data = await getGalleryDetail(id);

    if (!data) {
      return NextResponse.json(
        {
          error: 'Gallery not found',
          message:
            'This gallery has not been scraped yet. Please check the gallery list.',
        },
        { status: 404 }
      );
    }

    // Check if data is stale (older than 48 hours)
    const stale = isDataStale(data.lastUpdated, 48);

    return NextResponse.json({
      gallery: data.gallery,
      lastUpdated: data.lastUpdated,
      stale,
      imageCount: data.gallery.images.length,
    });
  } catch (error) {
    console.error('[API] Error fetching gallery images:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gallery images' },
      { status: 500 }
    );
  }
}
