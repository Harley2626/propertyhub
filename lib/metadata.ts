import type { Metadata } from "next";

/** Production domain — used as fallback when NEXT_PUBLIC_SITE_URL is unset. */
export const PRODUCTION_SITE_URL = "https://thepropertypilot.co.za";

function resolveSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? PRODUCTION_SITE_URL;
  return raw.replace(/\/+$/, "");
}

function resolveGoogleSiteVerification(): string | undefined {
  const token = process.env.GOOGLE_SITE_VERIFICATION?.trim();
  return token || undefined;
}

export const siteConfig = {
  name: "PropertyPilot",
  tagline: "Property & Finance Tools for South Africans",
  title: "PropertyPilot | Property & Finance Tools for South Africans",
  description:
    "Free property and finance calculators, guides, and tools to help South Africans make smarter property decisions.",
  ogTitle: "PropertyPilot",
  ogDescription: "Property & Finance Tools for South Africans",
  url: resolveSiteUrl(),
  locale: "en_ZA",
  keywords: [
    "PropertyPilot",
    "propertypilot",
    "thepropertypilot",
    "property calculator South Africa",
    "transfer duty calculator",
    "bond calculator",
    "home loan calculator",
    "affordability calculator",
    "income tax calculator South Africa",
    "property tools",
    "finance tools",
  ],
};

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  applicationName: siteConfig.name,
  alternates: {
    canonical: siteConfig.url,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.ogTitle,
    description: siteConfig.ogDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.ogTitle,
    description: siteConfig.ogDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
  ...(resolveGoogleSiteVerification()
    ? { verification: { google: resolveGoogleSiteVerification() } }
    : {}),
};

/** Build an absolute URL on the production domain. */
export function absoluteUrl(path = ""): string {
  const normalizedPath = path.startsWith("/") ? path : path ? `/${path}` : "";
  return `${siteConfig.url}${normalizedPath}`;
}
