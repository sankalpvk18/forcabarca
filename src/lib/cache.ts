import fs from "fs";
import path from "path";

const CACHE_DIR = path.join(process.cwd(), "src", "data", "cache");

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

function ensureCacheDir() {
  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
  }
}

function getCachePath(key: string): string {
  return path.join(CACHE_DIR, `${key}.json`);
}

export function getCache<T>(key: string): T | null {
  try {
    const filePath = getCachePath(key);
    if (!fs.existsSync(filePath)) return null;

    const raw = fs.readFileSync(filePath, "utf-8");
    const entry: CacheEntry<T> = JSON.parse(raw);

    const age = Date.now() - entry.timestamp;
    if (age > entry.ttl) return null;

    return entry.data;
  } catch {
    return null;
  }
}

export function setCache<T>(key: string, data: T, ttlMs: number): void {
  try {
    ensureCacheDir();
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      ttl: ttlMs,
    };
    fs.writeFileSync(getCachePath(key), JSON.stringify(entry, null, 2));
  } catch (error) {
    console.error("Cache write error:", error);
  }
}
