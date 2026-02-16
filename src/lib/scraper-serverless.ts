import * as cheerio from 'cheerio';

const BASE_URL = 'https://www.fcbarcelona.com';
const GALLERIES_URL = `${BASE_URL}/en/football/first-team/photos`;

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

/**
 * Scrape gallery list from FC Barcelona's photos page using Cheerio
 */
export async function scrapeGalleryList(): Promise<GalleryItem[]> {
  try {
    console.log('[SCRAPER] Fetching galleries page with Browserless...');

    const browserlessToken = process.env.BROWSERLESS_TOKEN;
    if (!browserlessToken) {
      throw new Error('BROWSERLESS_TOKEN environment variable not set');
    }

    // Use Browserless to render JavaScript-loaded thumbnails
    const browserlessUrl = `https://production-sfo.browserless.io/content?token=${browserlessToken}`;
    const response = await fetch(browserlessUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: GALLERIES_URL,
        waitForSelector: {
          selector: 'img',
          timeout: 15000, // Increased timeout to allow more time for images to load
        },
        bestAttempt: true,
      }),
    });

    console.log('[SCRAPER] Browserless response status:', response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[SCRAPER] Browserless error response:', errorText);
      throw new Error(
        `Failed to fetch galleries page with Browserless: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const galleries: GalleryItem[] = [];
    const seen = new Set<string>();

    $('a[href*="/football/first-team/photos/"]').each((_, element) => {
      const href = $(element).attr('href') || '';
      const match = href.match(/\/football\/first-team\/photos\/(\d+)\/(.+)/);

      if (!match) return;

      const id = match[1];
      if (seen.has(id)) return;
      seen.add(id);

      const slug = match[2];

      // Extract title from h2/h3/h4 or any element with 'title'/'heading' class
      const titleEl = $(element)
        .find("h2, h3, h4, [class*='title'], [class*='heading']")
        .first();
      let title =
        titleEl.length > 0 ? titleEl.text() : $(element).text();
      title = title
        .trim()
        .replace(/\s+/g, ' ')
        .replace(/\d+\s*$/, '')
        .trim() || `Gallery ${id}`;

      // Extract thumbnail from img tag
      const img = $(element).find('img').first();
      let thumbnail =
        img.attr('src') || img.attr('data-src') || img.attr('data-lazy-src') || '';

      // Fallback: check background-image in style attribute
      if (!thumbnail) {
        const bgEl = $(element)
          .find("[style*='background-image']")
          .first();
        const style = bgEl.attr('style') || '';
        const bgMatch = style.match(/url\(['"]?(.+?)['"]?\)/);
        if (bgMatch) thumbnail = bgMatch[1];
      }

      // Normalize thumbnail URL
      if (thumbnail && !thumbnail.startsWith('http')) {
        thumbnail = BASE_URL + thumbnail;
      }

      // Use placeholder if no thumbnail found
      if (!thumbnail) {
        thumbnail = 'https://www.fcbarcelona.com/favicon.ico';
      }

      // Extract date from text content
      const text = $(element).text();
      const dateMatch = text.match(
        /(\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{2,4})/i
      );
      const date = dateMatch ? dateMatch[1] : '';

      // Extract photo count
      const countMatch = text.match(/(\d+)\s*(?:photo|image|camera)/i);
      const photoCount = countMatch ? parseInt(countMatch[1]) : 0;

      galleries.push({
        id,
        title,
        slug,
        thumbnail,
        date,
        photoCount,
        url: `${BASE_URL}${href}`,
      });
    });

    console.log('[SCRAPER] Found', galleries.length, 'galleries');
    return galleries;
  } catch (error) {
    console.error('[SCRAPER] Error scraping gallery list:', error);
    throw error;
  }
}

/**
 * Scrape images from a specific gallery using Browserless for JavaScript rendering
 */
export async function scrapeGalleryImages(
  id: string,
  slug: string
): Promise<GalleryDetail> {
  try {
    const url = `${BASE_URL}/en/football/first-team/photos/${id}/${slug}`;
    console.log('[SCRAPER] Loading gallery with Browserless:', url);

    const browserlessToken = process.env.BROWSERLESS_TOKEN;
    if (!browserlessToken) {
      throw new Error('BROWSERLESS_TOKEN environment variable not set');
    }

    // Use Browserless to get rendered HTML with JavaScript-loaded images
    const browserlessUrl = `https://production-sfo.browserless.io/content?token=${browserlessToken}`;
    const requestBody = {
      url,
      waitForSelector: {
        selector: 'img[src*="photo-resources"]', // Wait for gallery images to load
        timeout: 15000, // 15 seconds max wait
      },
      bestAttempt: true, // Continue even if wait condition not met
    };

    console.log('[SCRAPER] Browserless request URL:', browserlessUrl.replace(browserlessToken, 'TOKEN_HIDDEN'));
    console.log('[SCRAPER] Browserless request body:', JSON.stringify(requestBody));

    const response = await fetch(browserlessUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });

    console.log('[SCRAPER] Browserless response status:', response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[SCRAPER] Browserless error response:', errorText);
      throw new Error(
        `Browserless request failed: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Extract title - avoid nav/header h1 elements
    const titleEl = $(
      "main h1, article h1, [class*='gallery'] h1, [class*='content'] h1, [class*='detail'] h1"
    ).first();
    let title = titleEl.length > 0 ? titleEl.text().trim() : '';

    // Fallback to slug if title is generic or too short
    if (!title || title.toLowerCase() === 'menu' || title.length < 3) {
      title = slug
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());
    }

    // Extract images from the rendered HTML
    const images: GalleryImage[] = [];
    const seen = new Set<string>();

    $('img').each((_, element) => {
      const src =
        $(element).attr('src') ||
        $(element).attr('data-src') ||
        $(element).attr('data-lazy-src') ||
        '';

      if (!src) return;

      // Filter: exclude icons, logos, badges, avatars, sponsors
      const excludeKeywords = [
        'icon',
        'logo',
        'badge',
        'avatar',
        'sponsor',
      ];
      if (excludeKeywords.some((keyword) => src.includes(keyword))) return;

      // Include only gallery images (photo-resources or fcbarcelona CDN)
      const isGalleryImage =
        src.includes('photo-resources') || src.includes('fcbarcelona');

      if (!isGalleryImage) return;

      // Normalize URL - remove query params for highest resolution
      let fullUrl = src.split('?')[0];
      if (!fullUrl.startsWith('http')) {
        fullUrl = BASE_URL + fullUrl;
      }

      // Deduplicate
      if (seen.has(fullUrl)) return;
      seen.add(fullUrl);

      images.push({
        url: fullUrl,
        alt: $(element).attr('alt') || '',
      });
    });

    console.log('[SCRAPER] Found', images.length, 'images in gallery', id);
    return { id, title, images };
  } catch (error) {
    console.error('[SCRAPER] Error scraping gallery images:', error);
    throw error;
  }
}
