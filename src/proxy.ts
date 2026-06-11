import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

function isBareBlogPostResolverPath(pathname: string) {
  return /^\/blog\/[^/]+\/?$/.test(pathname);
}

export default function proxy(request: NextRequest) {
  if (isBareBlogPostResolverPath(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
