import { absoluteUrl, siteConfig } from "@/lib/metadata";
import type { Metadata } from "next";
import { getPillarHubContent } from "./catalog";
import { getPillarBySlug, getPillarHubPath } from "./pillars";
import type { ContentPillarSlug } from "./types";

export function buildPillarHubPageUrl(slug: ContentPillarSlug): string {
  return absoluteUrl(getPillarHubPath(slug));
}

export function buildPillarHubMetadata(slug: string): Metadata {
  const pillar = getPillarBySlug(slug);
  if (!pillar) return { title: "Not Found" };

  const pageUrl = buildPillarHubPageUrl(pillar.slug);
  const title = `${pillar.name} Guides & Resources`;
  const description = pillar.hubDescription;

  return {
    title,
    description,
    alternates: { canonical: pageUrl },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url: pageUrl,
      type: "website",
      siteName: siteConfig.name,
      locale: siteConfig.locale,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
    },
  };
}

export function buildPillarHubSchema(slug: ContentPillarSlug) {
  const pillar = getPillarBySlug(slug);
  if (!pillar) return [];

  const pageUrl = buildPillarHubPageUrl(slug);
  const hub = getPillarHubContent(slug);

  return [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: pillar.name,
      description: pillar.hubDescription,
      url: pageUrl,
      inLanguage: "en-ZA",
      isPartOf: {
        "@type": "WebSite",
        name: siteConfig.name,
        url: siteConfig.url,
      },
      about: {
        "@type": "Thing",
        name: pillar.name,
      },
      hasPart: hub?.recentlyUpdated.map((item) => ({
        "@type": "WebPage",
        name: item.title,
        url: absoluteUrl(item.href),
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteConfig.url,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Guides",
          item: absoluteUrl("/guides"),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: pillar.name,
          item: pageUrl,
        },
      ],
    },
  ];
}
