import { NextResponse } from "next/server";
import { GPTService } from "@/lib/server/gptService";
import { UserContext, Message } from "@/types";
import { Redis } from "@upstash/redis";
import { headers } from "next/headers";

const gptService = new GPTService();
const redis = new Redis({
  url: process.env.REDIS_URL!,
  token: process.env.REDIS_TOKEN!,
});

const RATE_LIMITS = {
  PER_MINUTE: { max: 15, window: 60 },
  PER_HOUR: { max: 250, window: 3600 },
  PER_DAY: { max: 500, window: 86400 }
};

class RateLimitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RateLimitError';
  }
}

async function checkRateLimit(identifier: string) {
  const now = Math.floor(Date.now() / 1000);
  const pipeline = redis.pipeline();

  // Check each time window
  for (const [key, limit] of Object.entries(RATE_LIMITS)) {
    const windowKey = `ratelimit:${identifier}:${key}:${Math.floor(now / limit.window)}`;
    pipeline.incr(windowKey);
    pipeline.expire(windowKey, limit.window);
  }

  const results = await pipeline.exec() as [null | Error, number | null][];
  if (!results) throw new RateLimitError("Rate limit check failed");

  // Check if any limit is exceeded
  const counts = {
    minute: (results[0]?.[1] as number) || 0,
    hour: (results[2]?.[1] as number) || 0,
    day: (results[4]?.[1] as number) || 0,
  };

  if (counts.minute > RATE_LIMITS.PER_MINUTE.max) {
    throw new RateLimitError(`Rate limit exceeded: ${RATE_LIMITS.PER_MINUTE.max} requests per minute`);
  }
  if (counts.hour > RATE_LIMITS.PER_HOUR.max) {
    throw new RateLimitError(`Rate limit exceeded: ${RATE_LIMITS.PER_HOUR.max} requests per hour`);
  }
  if (counts.day > RATE_LIMITS.PER_DAY.max) {
    throw new RateLimitError(`Rate limit exceeded: ${RATE_LIMITS.PER_DAY.max} requests per day`);
  }

  return counts;
}

export async function POST(request: Request) {
  try {
    // Get user identifier (you might want to use a more secure method in production)
    const headersList = await headers();
    const userIP = headersList.get('x-forwarded-for') || 'unknown';
    const sessionId = headersList.get('x-session-id') || userIP;
    
    // Check rate limit
    try {
      await checkRateLimit(sessionId);
    } catch (error) {
      if (error instanceof RateLimitError) {
        return NextResponse.json(
          { error: error.message },
          { status: 429 }
        );
      }
      throw error; // Re-throw unexpected errors
    }

    const { query, userContext, messages } = await request.json();

    if (!query) {
      return NextResponse.json(
        { error: "Query is required" },
        { status: 400 }
      );
    }

    try {
      const response = await gptService.getExploreContent(
        query, 
        userContext as UserContext,
        messages as Message[]
      );
      return NextResponse.json(response);
    } catch (error) {
      console.error("Explore error:", error);
      return NextResponse.json(
        { error: "Failed to explore topic" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error in explore API:", error);
    return NextResponse.json(
      { error: "Invalid request format" },
      { status: 400 }
    );
  }
}
