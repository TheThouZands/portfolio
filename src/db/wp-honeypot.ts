import { and, count, eq, gte } from "drizzle-orm";
import { db } from "./client";
import { wpHoneypotLogs, type WpHoneypotPayload } from "./schema";

const DEFAULT_DAILY_LIMIT = 40;
const RAW_BODY_LIMIT = 16_000;

export type WpHoneypotLogInput = {
  request: Request;
  routeState: string;
  statusCode: number;
  step: string;
  body: Record<string, unknown>;
  rawBody: string;
};

function getDailyLimit() {
  const value = Number.parseInt(process.env.WP_HONEYPOT_DAILY_LOG_LIMIT ?? "", 10);

  return Number.isFinite(value) && value > 0 ? value : DEFAULT_DAILY_LIMIT;
}

function getFrontendName() {
  return process.env.WP_HONEYPOT_FRONTEND ?? "portfolio";
}

function getClientIp(headers: Headers) {
  const forwardedFor = headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || null;
  }

  return (
    headers.get("x-real-ip") ??
    headers.get("cf-connecting-ip") ??
    headers.get("x-vercel-forwarded-for") ??
    null
  );
}

function collectSearchParams(url: URL) {
  const values: Record<string, string | string[]> = {};

  url.searchParams.forEach((value, key) => {
    const current = values[key];

    if (Array.isArray(current)) {
      current.push(value);
    } else if (typeof current === "string") {
      values[key] = [current, value];
    } else {
      values[key] = value;
    }
  });

  return values;
}

function getUtcDayStart() {
  const dayStart = new Date();
  dayStart.setUTCHours(0, 0, 0, 0);

  return dayStart;
}

export async function logWpHoneypotAttempt(input: WpHoneypotLogInput) {
  if (!db) {
    return;
  }

  const frontend = getFrontendName();
  const dailyLimit = getDailyLimit();
  const url = new URL(input.request.url);
  const headers = input.request.headers;

  try {
    const [{ value }] = await db
      .select({ value: count() })
      .from(wpHoneypotLogs)
      .where(
        and(
          eq(wpHoneypotLogs.frontend, frontend),
          gte(wpHoneypotLogs.created_at, getUtcDayStart()),
        ),
      );

    if (value >= dailyLimit) {
      return;
    }

    const payload: WpHoneypotPayload = {
      query: collectSearchParams(url),
      body: input.body,
      headers: Object.fromEntries(headers.entries()),
    };

    await db.insert(wpHoneypotLogs).values({
      frontend,
      method: input.request.method,
      path: url.pathname,
      query_string: url.search || null,
      step: input.step,
      route_state: input.routeState,
      status_code: input.statusCode,
      ip_address: getClientIp(headers),
      user_agent: headers.get("user-agent"),
      referer: headers.get("referer"),
      accept_language: headers.get("accept-language"),
      content_type: headers.get("content-type"),
      raw_body: input.rawBody ? input.rawBody.slice(0, RAW_BODY_LIMIT) : null,
      payload,
    });
  } catch (error) {
    console.warn("Failed to log WordPress honeypot request:", error);
  }
}
