import { usePathname } from "next/navigation";
import { Locale, routeMap } from "@/i18n/routing";
import { findRouteKeyByPath } from "../_utils/redirectPath";

export function useLocaleTogglePath(): string | null {
  const pathname = usePathname();

  const segments = pathname.slice(1).split("/").filter(Boolean);

  const pageSegments = segments.length > 0 ? segments.slice(1) : [];

  const urlLocale = segments[0] as Locale;
  const actualLocale =
    urlLocale === "en" || urlLocale === "ro" ? urlLocale : "en";

  const routeKey = findRouteKeyByPath(actualLocale, pageSegments);

  if (!routeKey) {
    const otherLocale: Locale = actualLocale === "en" ? "ro" : "en";
    const newPath =
      pageSegments.length > 0
        ? `/${otherLocale}/${pageSegments.join("/")}`
        : `/${otherLocale}`;
    return newPath;
  }

  const otherLocale: Locale = actualLocale === "en" ? "ro" : "en";
  const otherSegments = routeMap[routeKey][otherLocale];

  const newPath = `/${otherLocale}/${otherSegments.join("/")}`;
  return newPath;
}
