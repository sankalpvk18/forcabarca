import puppeteer, { Page } from "puppeteer";

const BASE_URL = "https://www.fcbarcelona.com";
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

async function launchBrowser() {
  return puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
    ],
  });
}

async function autoScroll(page: Page) {
  await page.evaluate(async () => {
    await new Promise<void>((resolve) => {
      let totalHeight = 0;
      const distance = 400;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 200);
    });
  });
}

export async function scrapeGalleryList(): Promise<GalleryItem[]> {
  const browser = await launchBrowser();

  try {
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    );
    await page.setViewport({ width: 1280, height: 800 });

    await page.goto(GALLERIES_URL, {
      waitUntil: "networkidle2",
      timeout: 30000,
    });

    // Wait for gallery content to load
    await page.waitForSelector("a[href*='/photos/']", { timeout: 15000 });
    await autoScroll(page);
    // Give images a moment to lazy-load after scrolling
    await new Promise((r) => setTimeout(r, 2000));

    const galleries = await page.evaluate((baseUrl: string) => {
      const items: Array<{
        id: string;
        title: string;
        slug: string;
        thumbnail: string;
        date: string;
        photoCount: number;
        url: string;
      }> = [];

      // Find all gallery links
      const links = document.querySelectorAll(
        'a[href*="/football/first-team/photos/"]'
      );

      const seen = new Set<string>();

      links.forEach((link) => {
        const href = link.getAttribute("href") || "";
        // Match pattern: /en/football/first-team/photos/{id}/{slug}
        const match = href.match(
          /\/football\/first-team\/photos\/(\d+)\/(.+)/
        );
        if (!match) return;

        const id = match[1];
        if (seen.has(id)) return;
        seen.add(id);

        const slug = match[2];

        // Find title - look for heading or prominent text
        const titleEl =
          link.querySelector("h2, h3, h4, [class*='title'], [class*='heading']") ||
          link;
        const title =
          titleEl?.textContent?.trim().replace(/\s+/g, " ") || `Gallery ${id}`;

        // Find thumbnail image
        const img = link.querySelector("img");
        let thumbnail = "";
        if (img) {
          thumbnail =
            img.getAttribute("src") ||
            img.getAttribute("data-src") ||
            img.getAttribute("data-lazy-src") ||
            "";
        }
        // Also check for background-image
        if (!thumbnail) {
          const bgEl = link.querySelector("[style*='background-image']");
          if (bgEl) {
            const style = bgEl.getAttribute("style") || "";
            const bgMatch = style.match(/url\(['"]?(.+?)['"]?\)/);
            if (bgMatch) thumbnail = bgMatch[1];
          }
        }

        // Make sure thumbnail is absolute URL
        if (thumbnail && !thumbnail.startsWith("http")) {
          thumbnail = baseUrl + thumbnail;
        }

        // Try to find date and photo count from the text content
        const text = link.textContent || "";
        const dateMatch = text.match(
          /(\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{2,4})/i
        );
        const countMatch = text.match(/(\d+)\s*(?:photo|image|camera)/i);

        items.push({
          id,
          title: title.replace(/\d+\s*$/, "").trim() || `Gallery ${id}`,
          slug,
          thumbnail,
          date: dateMatch ? dateMatch[1] : "",
          photoCount: countMatch ? parseInt(countMatch[1]) : 0,
          url: `${baseUrl}${href}`,
        });
      });

      return items;
    }, BASE_URL);

    return galleries;
  } finally {
    await browser.close();
  }
}

export async function scrapeGalleryImages(
  id: string,
  slug: string
): Promise<GalleryDetail> {
  const browser = await launchBrowser();

  try {
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    );
    await page.setViewport({ width: 1280, height: 800 });

    const url = `${BASE_URL}/en/football/first-team/photos/${id}/${slug}`;
    await page.goto(url, {
      waitUntil: "networkidle2",
      timeout: 30000,
    });

    // Wait for images to appear
    await page.waitForSelector("img", { timeout: 15000 });

    // Auto-scroll to trigger lazy loading
    for (let i = 0; i < 5; i++) {
      await autoScroll(page);
      await new Promise((r) => setTimeout(r, 1500));
    }

    const result = await page.evaluate((args: { baseUrl: string; fallbackSlug: string }) => {
      const { baseUrl, fallbackSlug } = args;

      // Get gallery title — avoid nav/header h1 elements like "Menu"
      const titleEl =
        document.querySelector(
          "main h1, article h1, [class*='gallery'] h1, [class*='content'] h1, [class*='detail'] h1"
        ) || document.querySelector("h1:not(nav h1):not(header h1)");

      let title = titleEl?.textContent?.trim() || "";
      // If we got a generic nav word, fall back to slug
      if (!title || title.toLowerCase() === "menu" || title.length < 3) {
        title = fallbackSlug
          .replace(/-/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase());
      }

      // Collect all gallery images
      const images: Array<{ url: string; alt: string }> = [];
      const seen = new Set<string>();

      const imgElements = document.querySelectorAll("img");
      imgElements.forEach((img) => {
        const src =
          img.getAttribute("src") ||
          img.getAttribute("data-src") ||
          img.getAttribute("data-lazy-src") ||
          "";

        // Filter: only include photo-resources images (actual gallery photos)
        // Exclude icons, logos, avatars, and tiny images
        if (!src) return;
        if (
          src.includes("icon") ||
          src.includes("logo") ||
          src.includes("badge") ||
          src.includes("avatar") ||
          src.includes("sponsor")
        )
          return;

        // Check natural size - skip tiny images (icons, etc.)
        if (img.naturalWidth > 0 && img.naturalWidth < 100) return;
        if (img.naturalHeight > 0 && img.naturalHeight < 100) return;

        // Prefer photo-resources URLs but also accept other CDN images
        const isGalleryImage =
          src.includes("photo-resources") ||
          src.includes("fcbarcelona") ||
          (img.width > 200 && img.height > 150);

        if (!isGalleryImage) return;

        // Get highest resolution by removing width/height params
        let fullUrl = src;
        if (fullUrl.includes("?")) {
          const urlBase = fullUrl.split("?")[0];
          fullUrl = urlBase;
        }
        if (!fullUrl.startsWith("http")) {
          fullUrl = baseUrl + fullUrl;
        }

        if (seen.has(fullUrl)) return;
        seen.add(fullUrl);

        images.push({
          url: fullUrl,
          alt: img.getAttribute("alt") || "",
        });
      });

      return { title, images };
    }, { baseUrl: BASE_URL, fallbackSlug: slug });

    return {
      id,
      title: result.title,
      images: result.images,
    };
  } finally {
    await browser.close();
  }
}
