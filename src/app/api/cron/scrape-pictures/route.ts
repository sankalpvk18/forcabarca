import { NextRequest, NextResponse } from 'next/server';
import {
  scrapeGalleryList,
  scrapeGalleryImages,
  GalleryItem,
} from '@/lib/scraper-serverless';
import {
  saveGalleryList,
  saveGalleryDetail,
  updateScrapeMetadata,
  updateGalleryThumbnail,
  ScrapeMetadata,
} from '@/lib/storage';

// Mark as dynamic to prevent static rendering at build time
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 60; // 60 seconds for scraping (requires Pro tier)

/**
 * Vercel Cron Job Endpoint
 * Runs daily at 3 AM UTC to scrape galleries and update Blob storage
 *
 * Schedule: 0 3 * * * (3 AM UTC daily)
 * Secured by Vercel's automatic cron authentication
 */
export async function GET(request: NextRequest) {
  const startTime = Date.now();
  console.log('[CRON] Scraping pictures started at', new Date().toISOString());

  try {
    // Verify this is a legitimate Vercel cron request
    const authHeader = request.headers.get('authorization');
    if (
      authHeader &&
      !authHeader.startsWith('Bearer ')
    ) {
      console.warn('[CRON] Invalid authorization header');
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Initialize metadata
    const metadata: ScrapeMetadata = {
      lastScrapeStarted: new Date().toISOString(),
      lastScrapeCompleted: '',
      lastScrapeStatus: 'success',
      galleriesScraped: 0,
      totalGalleries: 0,
      errors: [],
      nextScheduledScrape: getNextScheduleTime(),
    };

    // Step 1: Scrape gallery list
    console.log('[CRON] Step 1: Scraping gallery list...');
    let galleries: GalleryItem[] = [];
    try {
      galleries = await scrapeGalleryList();
      console.log('[CRON] Successfully scraped', galleries.length, 'galleries');
      metadata.totalGalleries = galleries.length;
    } catch (error) {
      const errorMsg = `Failed to scrape gallery list: ${error instanceof Error ? error.message : String(error)}`;
      console.error('[CRON]', errorMsg);
      metadata.errors.push(errorMsg);
      metadata.lastScrapeStatus = 'failed';
      // Still try to continue if list scrape fails
    }

    // If no galleries found, return error
    if (galleries.length === 0) {
      console.error('[CRON] No galleries found');
      metadata.lastScrapeStatus = 'failed';
      metadata.errors.push('No galleries found to scrape');

      // Update metadata and return
      metadata.lastScrapeCompleted = new Date().toISOString();
      await updateScrapeMetadata(metadata);

      return NextResponse.json(
        {
          status: 'failed',
          message: 'No galleries found',
          metadata,
        },
        { status: 400 }
      );
    }

    // Step 2: Save gallery list to Blob
    console.log('[CRON] Step 2: Saving gallery list to Blob...');
    try {
      await saveGalleryList(galleries);
      console.log('[CRON] Successfully saved gallery list');
    } catch (error) {
      const errorMsg = `Failed to save gallery list: ${error instanceof Error ? error.message : String(error)}`;
      console.error('[CRON]', errorMsg);
      metadata.errors.push(errorMsg);
      metadata.lastScrapeStatus = 'failed';

      // Update metadata and return if we can't save the list
      metadata.lastScrapeCompleted = new Date().toISOString();
      await updateScrapeMetadata(metadata);

      return NextResponse.json(
        {
          status: 'failed',
          message: 'Failed to save gallery list',
          metadata,
        },
        { status: 500 }
      );
    }

    // Step 3: Scrape individual galleries
    // On each run, scrape galleries sequentially until ~8 seconds remaining
    // This allows continuous progress through all galleries across multiple cron runs
    console.log('[CRON] Step 3: Scraping galleries with time-aware batching...');
    let successCount = 0;
    let failureCount = 0;
    const timeLimit = 8000; // Reserve 8 seconds for other operations, use remaining for scraping
    const SCRAPE_TIME_PER_GALLERY = 300; // Estimated ms per gallery (Browserless ~200-300ms)

    for (const gallery of galleries) {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = timeLimit - elapsedTime;

      // Stop if we're running low on time
      if (remainingTime < SCRAPE_TIME_PER_GALLERY) {
        console.log(`[CRON] Stopping scrape - running low on time. Elapsed: ${elapsedTime}ms, Remaining: ${remainingTime}ms`);
        break;
      }

      try {
        console.log(`[CRON] Scraping gallery ${gallery.id}: ${gallery.title}...`);
        const galleryDetail = await scrapeGalleryImages(
          gallery.id,
          gallery.slug
        );

        // Save individual gallery to Blob
        await saveGalleryDetail(gallery.id, galleryDetail);

        // Use first image as thumbnail for gallery list
        if (galleryDetail.images.length > 0) {
          const thumbnail = galleryDetail.images[0].url;
          await updateGalleryThumbnail(gallery.id, thumbnail);
          console.log(`[CRON] Updated thumbnail for gallery ${gallery.id}`);
        }

        console.log(`[CRON] Successfully saved gallery ${gallery.id}`);
        successCount++;
      } catch (error) {
        failureCount++;
        const errorMsg = `Failed to scrape gallery ${gallery.id}: ${error instanceof Error ? error.message : String(error)}`;
        console.error('[CRON]', errorMsg);
        metadata.errors.push(errorMsg);
        // Continue to next gallery instead of failing
      }
    }

    metadata.galleriesScraped = successCount;

    // Determine final status
    if (failureCount > 0 && successCount > 0) {
      metadata.lastScrapeStatus = 'partial';
    } else if (failureCount > 0) {
      metadata.lastScrapeStatus = 'failed';
    } else {
      metadata.lastScrapeStatus = 'success';
    }

    // Step 4: Update metadata
    console.log('[CRON] Step 4: Updating metadata...');
    metadata.lastScrapeCompleted = new Date().toISOString();
    try {
      await updateScrapeMetadata(metadata);
      console.log('[CRON] Successfully updated metadata');
    } catch (error) {
      const errorMsg = `Failed to update metadata: ${error instanceof Error ? error.message : String(error)}`;
      console.error('[CRON]', errorMsg);
      // Don't fail if metadata update fails
    }

    // Calculate duration
    const duration = Date.now() - startTime;
    console.log(
      `[CRON] Completed in ${duration}ms. Status: ${metadata.lastScrapeStatus}`
    );

    // Return success response
    return NextResponse.json(
      {
        status: metadata.lastScrapeStatus,
        message: `Scraped ${successCount}/${galleries.length} galleries`,
        metadata,
        duration,
      },
      {
        status: metadata.lastScrapeStatus === 'failed' ? 500 : 200,
      }
    );
  } catch (error) {
    const errorMsg = `Unexpected error in cron job: ${error instanceof Error ? error.message : String(error)}`;
    console.error('[CRON]', errorMsg);

    const metadata: ScrapeMetadata = {
      lastScrapeStarted: new Date().toISOString(),
      lastScrapeCompleted: new Date().toISOString(),
      lastScrapeStatus: 'failed',
      galleriesScraped: 0,
      totalGalleries: 0,
      errors: [errorMsg],
      nextScheduledScrape: getNextScheduleTime(),
    };

    try {
      await updateScrapeMetadata(metadata);
    } catch {
      // Silently fail if metadata update fails
    }

    return NextResponse.json(
      {
        status: 'failed',
        message: errorMsg,
        metadata,
      },
      { status: 500 }
    );
  }
}

/**
 * Calculate next scheduled scrape time (24 hours from now, at 3 AM UTC)
 */
function getNextScheduleTime(): string {
  const now = new Date();
  const next = new Date(now);
  next.setUTCHours(3, 0, 0, 0);
  next.setUTCDate(next.getUTCDate() + 1);
  return next.toISOString();
}
