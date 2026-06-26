import { absoluteUrl, siteConfig } from "@/lib/metadata";
import type { Metadata } from "next";

type StaticPageMetadataInput = {
  title: string;
  description: string;
  path: string;
};

export function buildStaticPageMetadata({
  title,
  description,
  path,
}: StaticPageMetadataInput): Metadata {
  const pageUrl = absoluteUrl(path);
  const ogTitle = `${title} | ${siteConfig.name}`;

  return {
    title,
    description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: ogTitle,
      description,
      url: pageUrl,
      type: "website",
      siteName: siteConfig.name,
      locale: siteConfig.locale,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
    },
  };
}

type BreadcrumbItem = {
  name: string;
  path?: string;
};

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.path ? { item: absoluteUrl(item.path) } : {}),
    })),
  };
}

export function buildPageBreadcrumbSchema(pageTitle: string, path: string) {
  return buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: pageTitle, path },
  ]);
}
