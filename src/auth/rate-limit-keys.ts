function readForwardedHeader(headers: Headers, key: string): string | null {
  const value = headers.get(key);

  if (!value) {
    return null;
  }

  return value.split(",")[0]?.trim() || null;
}

export function getAuthRateLimitIp(headers: Headers): string {
  return (
    readForwardedHeader(headers, "x-forwarded-for") ??
    readForwardedHeader(headers, "x-real-ip") ??
    readForwardedHeader(headers, "cf-connecting-ip") ??
    "unknown"
  );
}

export function createAuthRateLimitKey(headers: Headers, scope: string): string {
  return `auth:${scope}:${getAuthRateLimitIp(headers)}`;
}
