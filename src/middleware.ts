// middleware.ts (in your project root)
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware({
  ...routing,
  // Redirect paths without locale to default locale
  localePrefix: "always",
});

export const config = {
  // Match all pathnames except for
  // - api routes
  // - _next (Next.js internals)
  // - _static (inside /public)
  // - all files inside /public (e.g. /favicon.ico)
  matcher: [
    "/((?!api|_next|_vercel|.*\\..*).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
