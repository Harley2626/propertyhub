import type { Metadata } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://thepropertypilot.co.za";

export const siteConfig = {
  name: "PropertyPilot",
  tagline: "Property & Finance Tools for South Africans",
  title: "PropertyPilot | Property & Finance Tools for South Africans",
  description:
    "Free property and finance calculators, guides, and tools to help South Africans make smarter property decisions.",
  ogTitle: "PropertyPilot",
  ogDescription: "Property & Finance Tools for South Africans",
  url: siteUrl,
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
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
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
};
