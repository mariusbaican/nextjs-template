import { Locale } from "@/i18n/routing";
import { useLocale as useNextIntlLocale } from "next-intl";

const supportedLocales: Locale[] = ["en", "ro"];

export function useStrictLocale(): Locale {
  const locale = useNextIntlLocale();

  if (!supportedLocales.includes(locale as Locale)) {
    throw new Error(`Unsupported locale: ${locale}`);
  }

  return locale as Locale;
}
