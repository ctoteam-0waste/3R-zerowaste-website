import "server-only";

/** CORS + light abuse protection for the public endpoints used by 0waste.co.in and karmaverse.earth. */

const ALLOWED = ["https://karmaverse.earth", "https://www.karmaverse.earth", "https://0waste.co.in", "https://www.0waste.co.in"];

export function corsFor(req: Request, methods = "GET, POST, OPTIONS") {
  const origin = req.headers.get("origin") ?? "";
  const dev = /^http:\/\/localhost(:\d+)?$/.test(origin) && process.env.NODE_ENV !== "production";
  return {
    "Access-Control-Allow-Origin": ALLOWED.includes(origin) || dev ? origin : ALLOWED[0],
    "Access-Control-Allow-Methods": methods,
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };
}

export function clientIp(req: Request) {
  return (req.headers.get("x-forwarded-for")?.split(",")[0] || req.headers.get("x-real-ip") || "unknown").trim();
}

/** In-memory "at most N per window" limiter, keyed by e.g. IP + action. */
const hits = new Map<string, number[]>();
export function allow(key: string, max: number, windowMs: number) {
  const now = Date.now();
  const list = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (list.length >= max) {
    hits.set(key, list);
    return false;
  }
  list.push(now);
  hits.set(key, list);
  if (hits.size > 20_000) for (const [k, v] of hits) if (!v.length || now - v[v.length - 1] > windowMs) hits.delete(k);
  return true;
}
