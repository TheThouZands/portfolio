import { hasLocale } from "next-intl";
import type { NextRequest } from "next/server";
import { routing, routingLocaleCookie } from "./routing";

export function getCookieLocale(request: Pick<NextRequest, "cookies">) {
  const locale = request.cookies.get(routingLocaleCookie.name)?.value;

  if (hasLocale(routing.locales, locale)) {
    return locale;
  }

  return routing.defaultLocale;
}
