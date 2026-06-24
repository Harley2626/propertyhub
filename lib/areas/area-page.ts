import { absoluteUrl, siteConfig } from "@/lib/metadata";
import type { Metadata } from "next";
import { getCityBySlug, getLocationBySlug } from "./registry";
import { isSuburbGuide, type LocationGuide } from "./types";

export function buildAreaPageUrl(slug: string): string {
  return absoluteUrl(`/areas/${slug}`);
}

export function buildAreaMetadata(slug: string): Metadata {
  const guide = getLocationBySlug(slug);
  if (!guide) return { title: "Area Not Found" };

  const pageUrl = buildAreaPageUrl(slug);
  const defaultKeywords = isSuburbGuide(guide)
    ? [
        `${guide.suburb.toLowerCase()} property`,
        `buying property ${guide.suburb.toLowerCase()}`,
        `${guide.city.toLowerCase()} suburbs`,
        "property market south africa",
      ]
    : [
        `${guide.city.toLowerCase()} property`,
        `${guide.city.toLowerCase()} property prices`,
        "property market south africa",
      ];

  return {
    title: guide.title,
    description: guide.description,
    keywords: guide.keywords ?? defaultKeywords,
    alternates: { canonical: pageUrl },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url: pageUrl,
      type: "article",
      siteName: siteConfig.name,
      publishedTime: guide.publishedDate,
      modifiedTime: guide.updatedDate,
      locale: siteConfig.locale,
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.description,
    },
  };
}

export function buildAreaSchema(guide: LocationGuide) {
  const pageUrl = buildAreaPageUrl(guide.slug);

  const about = isSuburbGuide(guide)
    ? {
        "@type": "Place",
        name: guide.suburb,
        containedInPlace: {
          "@type": "City",
          name: guide.city,
          containedInPlace: {
            "@type": "AdministrativeArea",
            name: guide.province,
          },
        },
      }
    : {
        "@type": "City",
        name: guide.city,
        containedInPlace: {
          "@type": "AdministrativeArea",
          name: guide.province,
        },
      };

  const breadcrumbItems: Record<string, unknown>[] = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: siteConfig.url,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Areas",
      item: absoluteUrl("/areas"),
    },
  ];

  if (isSuburbGuide(guide)) {
    const parentCity = getCityBySlug(guide.parentAreaSlug);
    breadcrumbItems.push({
      "@type": "ListItem",
      position: 3,
      name: parentCity?.title ?? `${guide.city} property guide`,
      item: absoluteUrl(`/areas/${guide.parentAreaSlug}`),
    });
    breadcrumbItems.push({
      "@type": "ListItem",
      position: 4,
      name: guide.title,
      item: pageUrl,
    });
  } else {
    breadcrumbItems.push({
      "@type": "ListItem",
      position: 3,
      name: guide.title,
      item: pageUrl,
    });
  }

  const schema: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: guide.title,
      description: guide.description,
      datePublished: guide.publishedDate,
      dateModified: guide.lastReviewed,
      inLanguage: "en-ZA",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": pageUrl,
      },
      author: {
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.url,
      },
      publisher: {
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.url,
      },
      articleSection: isSuburbGuide(guide)
        ? "Suburb Property Guides"
        : "Property Areas",
      keywords: (guide.keywords ?? [
        isSuburbGuide(guide) ? guide.suburb : guide.city,
        guide.province,
        "property market",
        "South Africa",
      ]).join(", "),
      about,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbItems,
    },
  ];

  if (guide.faqs.length > 0) {
    schema.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: guide.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    });
  }

  return schema;
}
