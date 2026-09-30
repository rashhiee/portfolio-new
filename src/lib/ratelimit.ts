import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// In-memory sliding-window fallback for local development or testing without live Upstash keys
interface MemoryRecord {
  timestamps: number[];
}

const memoryStore = new Map<string, MemoryRecord>();

const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 3; // 3 requests per 15 min per IP

function memoryRateLimit(identifier: string) {
  const now = Date.now();
  const record = memoryStore.get(identifier) || { timestamps: [] };

  // Remove timestamps outside the sliding window
  const validTimestamps = record.timestamps.filter((ts) => now - ts < WINDOW_MS);

  if (validTimestamps.length >= MAX_REQUESTS) {
    const oldest = validTimestamps[0];
    const resetTime = oldest + WINDOW_MS;
    return {
      success: false,
      limit: MAX_REQUESTS,
      remaining: 0,
      reset: resetTime,
    };
  }

  validTimestamps.push(now);
  memoryStore.set(identifier, { timestamps: validTimestamps });

  return {
    success: true,
    limit: MAX_REQUESTS,
    remaining: MAX_REQUESTS - validTimestamps.length,
    reset: now + WINDOW_MS,
  };
}

export async function checkRateLimit(identifier: string) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  // If live Upstash credentials are provided, use Upstash Redis
  if (url && token && !url.includes("your-upstash-redis")) {
    try {
      const redis = new Redis({ url, token });
      const ratelimit = new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(MAX_REQUESTS, "15 m"),
        prefix: "@portfolio/contact",
      });
      return await ratelimit.limit(identifier);
    } catch (err) {
      console.warn("Upstash Redis connection failed, utilizing sliding window fallback:", err);
      return memoryRateLimit(identifier);
    }
  }

  // Fallback to in-memory sliding window
  return memoryRateLimit(identifier);
}

// Helper to reset memory store during test suites
export function resetMemoryRateLimit() {
  memoryStore.clear();
}
