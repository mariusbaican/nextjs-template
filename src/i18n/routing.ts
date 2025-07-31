import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ro"],

  defaultLocale: "en",
});

export type Locale = "en" | "ro";

export type RedirectKey = {};

export type RouteKey = {};

export const routeMap: Record<
  RouteKey | RedirectKey,
  Record<Locale, string[]>
> = {};
