import { Locale, RouteKey, routeMap } from "@/i18n/routing";

export function i18nPath(locale: Locale, routeKey: RouteKey): string {
  const segments: string[] = routeMap[routeKey]?.[locale];
  if (!segments)
    throw new Error(`Route ${routeKey} not defined for locale ${locale}`);

  return `/${locale}/${segments.join("/")}`;
}

export function findRouteKeyByPath(
  locale: Locale,
  pathSegments: string[]
): RouteKey | null {
  for (const [key, locales] of Object.entries(routeMap) as [
    RouteKey,
    Record<Locale, string[]>
  ][]) {
    if (locales[locale].join("/") === pathSegments.join("/")) {
      return key;
    }
  }
  return null;
}
