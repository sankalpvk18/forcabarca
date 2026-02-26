import { put, head, del } from '@vercel/blob';

export interface GalleryItem {
  id: string;
  title: string;
  slug: string;
  thumbnail: string;
  date: string;
  photoCount: number;
  url: string;
}

export interface GalleryImage {
  url: string;
  alt: string;
}

export interface GalleryDetail {
  id: string;
  title: string;
  images: GalleryImage[];
}

export interface ScrapeMetadata {
  lastScrapeStarted: string;
  lastScrapeCompleted: string;
  lastScrapeStatus: 'success' | 'partial' | 'failed';
  galleriesScraped: number;
  totalGalleries: number;
  errors: string[];
  nextScheduledScrape: string;
}

interface StoredGalleryList {
  galleries: GalleryItem[];
  lastUpdated: string;
  scrapedCount: number;
}

interface StoredGalleryDetail {
  gallery: GalleryDetail;
  lastUpdated: string;
}

const BLOB_STORE_PATH = 'galleries';

/**
 * Save gallery list to Blob storage
 */
export async function saveGalleryList(
  galleries: GalleryItem[]
): Promise<void> {
  try {
    const data: StoredGalleryList = {
      galleries,
      lastUpdated: new Date().toISOString(),
      scrapedCount: galleries.length,
    };

    await put(`${BLOB_STORE_PATH}/list.json`, JSON.stringify(data, null, 2), {
      contentType: 'application/json',
      access: 'public',
      allowOverwrite: true,
    });

    console.log('[BLOB] Saved gallery list:', galleries.length, 'items');
  } catch (error) {
    console.error('[BLOB] Error saving gallery list:', error);
    throw error;
  }
}

/**
 * Get gallery list from Blob storage
 */
export async function getGalleryList(): Promise<StoredGalleryList | null> {
  try {
    const blob = await head(`${BLOB_STORE_PATH}/list.json`);
    if (!blob) return null;

    const response = await fetch(blob.url);
    const data: StoredGalleryList = await response.json();
    return data;
  } catch (error) {
    console.error('[BLOB] Error reading gallery list:', error);
    return null;
  }
}

/**
 * Save individual gallery detail to Blob storage
 */
export async function saveGalleryDetail(
  id: string,
  gallery: GalleryDetail
): Promise<void> {
  try {
    const data: StoredGalleryDetail = {
      gallery,
      lastUpdated: new Date().toISOString(),
    };

    await put(
      `${BLOB_STORE_PATH}/${id}.json`,
      JSON.stringify(data, null, 2),
      {
        contentType: 'application/json',
        access: 'public',
        allowOverwrite: true,
      }
    );

    console.log('[BLOB] Saved gallery detail:', id);
  } catch (error) {
    console.error('[BLOB] Error saving gallery detail:', id, error);
    throw error;
  }
}

/**
 * Update a specific gallery's thumbnail in the gallery list
 */
export async function updateGalleryThumbnail(
  id: string,
  thumbnail: string
): Promise<void> {
  try {
    // Get current gallery list
    const data = await getGalleryList();
    if (!data) {
      console.warn('[BLOB] No gallery list found, cannot update thumbnail');
      return;
    }

    // Find and update the gallery
    const galleryIndex = data.galleries.findIndex((g) => g.id === id);
    if (galleryIndex === -1) {
      console.warn(`[BLOB] Gallery ${id} not found in list`);
      return;
    }

    // Update thumbnail
    data.galleries[galleryIndex].thumbnail = thumbnail;

    // Save updated list
    await saveGalleryList(data.galleries);
    console.log('[BLOB] Updated thumbnail for gallery:', id);
  } catch (error) {
    console.error('[BLOB] Error updating gallery thumbnail:', id, error);
    // Don't throw - this is a non-critical update
  }
}

/**
 * Get individual gallery detail from Blob storage
 */
export async function getGalleryDetail(
  id: string
): Promise<StoredGalleryDetail | null> {
  try {
    const blob = await head(`${BLOB_STORE_PATH}/${id}.json`);
    if (!blob) return null;

    const response = await fetch(blob.url);
    const data: StoredGalleryDetail = await response.json();
    return data;
  } catch (error) {
    console.error('[BLOB] Error reading gallery detail:', id, error);
    return null;
  }
}

/**
 * Update scraping metadata in Blob storage
 */
export async function updateScrapeMetadata(
  metadata: ScrapeMetadata
): Promise<void> {
  try {
    await put(
      `${BLOB_STORE_PATH}/metadata.json`,
      JSON.stringify(metadata, null, 2),
      {
        contentType: 'application/json',
        access: 'public',
        allowOverwrite: true,
      }
    );

    console.log('[BLOB] Updated scrape metadata');
  } catch (error) {
    console.error('[BLOB] Error updating metadata:', error);
    throw error;
  }
}

/**
 * Get scraping metadata from Blob storage
 */
export async function getScrapeMetadata(): Promise<ScrapeMetadata | null> {
  try {
    const blob = await head(`${BLOB_STORE_PATH}/metadata.json`);
    if (!blob) return null;

    const response = await fetch(blob.url);
    const data: ScrapeMetadata = await response.json();
    return data;
  } catch (error) {
    console.error('[BLOB] Error reading metadata:', error);
    return null;
  }
}

/**
 * Check if data is stale (more than maxHours old)
 */
export function isDataStale(
  lastUpdated: string,
  maxHours: number = 24
): boolean {
  const lastUpdatedDate = new Date(lastUpdated);
  const now = new Date();
  const hoursDiff =
    (now.getTime() - lastUpdatedDate.getTime()) / (1000 * 60 * 60);
  return hoursDiff > maxHours;
}

/**
 * Delete all stored galleries (for cleanup/reset)
 */
export async function deleteAllGalleries(): Promise<void> {
  try {
    await del([
      `${BLOB_STORE_PATH}/list.json`,
      `${BLOB_STORE_PATH}/metadata.json`,
    ]);
    console.log('[BLOB] Deleted all galleries');
  } catch (error) {
    console.error('[BLOB] Error deleting galleries:', error);
  }
}
