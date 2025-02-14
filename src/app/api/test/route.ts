import { Redis } from "@upstash/redis";

export async function GET() {
  const redis = new Redis({
    url: process.env.REDIS_URL!,
    token: process.env.REDIS_TOKEN!,
  });

  const count = await redis.incr("test_counter");
  return Response.json({ count });
}