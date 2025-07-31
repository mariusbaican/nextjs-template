import "./globals.css";
import type { Metadata } from "next";
import { Inter, Anek_Latin } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const anekLatin = Anek_Latin({
  variable: "--font-anek-latin",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    url: "",
    siteName: "",
    images: [
      {
        url: "",
        width: 256,
        height: 256,
        alt: "",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [""],
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html
      lang={locale}
      className="overflow-x-hidden"
    >
      <body
        className={`${anekLatin.variable} ${inter.variable} antialiased flex flex-col`}
      >
        <NextIntlClientProvider>
          {/* <GlobalProvider>
            <Nav /> */}
          {children}
          {/* </GlobalProvider> */}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
