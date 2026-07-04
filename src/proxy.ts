import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { getCookieLocale } from "./i18n/locale";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

function isBareBlogPostResolverPath(pathname: string) {
  return /^\/blog\/[^/]+\/?$/.test(pathname);
}

function isBareSkillsIndexPath(pathname: string) {
  return /^\/skills\/?$/.test(pathname);
}

export default function proxy(request: NextRequest) {
  if (isBareSkillsIndexPath(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL(`/${getCookieLocale(request)}`, request.url), 308);
  }

  if (isBareBlogPostResolverPath(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
