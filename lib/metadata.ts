import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://propertyhub.co.za";

export const siteConfig = {
  name: "PropertyHub",
  title: "PropertyHub — Property & Finance Tools for South Africans",
  description:
    "Free property and finance calculators and guides for South Africa. Transfer duty, bond repayments, affordability, tax tools, and more.",
  url: siteUrl,
  locale: "en_ZA",
  keywords: [
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
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};
