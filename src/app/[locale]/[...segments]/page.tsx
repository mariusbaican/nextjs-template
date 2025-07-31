import { notFound, redirect } from "next/navigation";
import { routeMap, RouteKey, RedirectKey } from "@/i18n/routing";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

const metadataMap: Record<RouteKey, Record<string, Metadata>> = {};

const componentMap: Record<RouteKey, React.ComponentType> = {};

const redirectMap: Record<RedirectKey, string> = {};

function findRouteMatch(segments: string[], locale?: string) {
  if (locale) {
    const match = Object.entries(routeMap).find(([, localized]) => {
      const localizedPath = localized[locale as "en" | "ro"];
      return (
        localizedPath.length === segments.length &&
        localizedPath.every((seg, idx) => seg === segments[idx])
      );
    });
    if (match) {
      return { key: match[0], detectedLocale: locale };
    }
  }

  for (const [routeKey, localized] of Object.entries(routeMap)) {
    for (const [lang, path] of Object.entries(localized)) {
      if (
        path.length === segments.length &&
        path.every((seg, idx) => seg === segments[idx])
      ) {
        return { key: routeKey, detectedLocale: lang };
      }
    }
  }

  return null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; segments?: string[] }>;
}): Promise<Metadata> {
  const { locale, segments = [] } = await params;

  const match = findRouteMatch(segments, locale);
  console.log(match);

  if (!match) {
    return {
      title: locale === "en" ? "Page not found" : "Pagina nu există",
      description:
        locale === "en"
          ? "The page you're looking for doesn't exist."
          : "Pagina pe care o cauți nu există.",
    };
  }

  const { key } = match;

  if (key in redirectMap) {
    return {
      title: locale === "en" ? "Redirecting..." : "Redirecționare...",
      description:
        locale === "en"
          ? "Redirecting to external resource."
          : "Ești redirecționat către o resursă externă",
    };
  }

  const pageMeta = metadataMap[key as RouteKey];

  return (
    pageMeta?.[locale] ?? {
      title: locale === "en" ? "Name" : "Nume",
      description:
        locale === "en"
          ? "Official website of Name."
          : "Website-ul oficial al Nume.",
    }
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; segments?: string[] }>;
}) {
  const { locale, segments = [] } = await params;

  const match = findRouteMatch(segments, locale);

  if (!match) {
    return notFound();
  }

  const { key, detectedLocale } = match;

  if (detectedLocale !== locale) {
    const correctPath = `/${detectedLocale}/${segments.join("/")}`;
    redirect(correctPath);
  }

  if (key in redirectMap) {
    redirect(redirectMap[key as RedirectKey]);
  }

  const Component = componentMap[key as RouteKey];
  if (!Component) {
    return notFound();
  }

  return <Component />;
}
