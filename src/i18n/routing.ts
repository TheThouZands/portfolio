import { defineRouting } from "next-intl/routing";

export const routingLocaleCookie = {
  name: "NEXT_LOCALE",
} as const;

export const routing = defineRouting({
  locales: ["en", "es"],
  defaultLocale: "en",
  alternateLinks: false,
  localeCookie: routingLocaleCookie,
});
