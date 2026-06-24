import { absoluteUrl, siteConfig } from "@/lib/metadata";
import type { Metadata } from "next";
import { getAreaBySlug } from "./registry";
import type { AreaGuide } from "./types";

export function buildAreaPageUrl(slug: string): string {
  return absoluteUrl(`/areas/${slug}`);
}

export function buildAreaMetadata(slug: string): Metadata {
  const area = getAreaBySlug(slug);
  if (!area) return { title: "Area Not Found" };

  const pageUrl = buildAreaPageUrl(slug);

  return {
    title: area.title,
    description: area.description,
    keywords: area.keywords ?? [
      `${area.city.toLowerCase()} property`,
      `${area.city.toLowerCase()} property prices`,
      "property market south africa",
      "propertypilot",
    ],
    alternates: { canonical: pageUrl },
    openGraph: {
      title: area.title,
      description: area.description,
      url: pageUrl,
      type: "article",
      siteName: siteConfig.name,
      publishedTime: area.publishedDate,
      modifiedTime: area.updatedDate,
      locale: siteConfig.locale,
    },
    twitter: {
      card: "summary_large_image",
      title: area.title,
      description: area.description,
    },
  };
}

export function buildAreaSchema(area: AreaGuide) {
  const pageUrl = buildAreaPageUrl(area.slug);

  const schema: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: area.title,
      description: area.description,
      datePublished: area.publishedDate,
      dateModified: area.updatedDate,
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
      articleSection: "Property Areas",
      keywords: (area.keywords ?? [
        area.city,
        area.province,
        "property market",
        "South Africa",
      ]).join(", "),
      about: {
        "@type": "City",
        name: area.city,
        containedInPlace: {
          "@type": "AdministrativeArea",
          name: area.province,
        },
      },
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
          name: "Areas",
          item: absoluteUrl("/areas"),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: area.title,
          item: pageUrl,
        },
      ],
    },
  ];

  if (area.faqs.length > 0) {
    schema.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: area.faqs.map((faq) => ({
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
