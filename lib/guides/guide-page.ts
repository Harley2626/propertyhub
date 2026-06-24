import { absoluteUrl, siteConfig } from "@/lib/metadata";
import type { Metadata } from "next";
import { getGuideBySlug } from "./registry";
import type { GuideArticle } from "./types";

export function buildGuidePageUrl(slug: string): string {
  return absoluteUrl(`/guides/${slug}`);
}

export function buildGuideMetadata(slug: string): Metadata {
  const guide = getGuideBySlug(slug);
  if (!guide) return { title: "Guide Not Found" };

  const pageUrl = buildGuidePageUrl(slug);

  return {
    title: guide.title,
    description: guide.description,
    keywords: [
      "bond calculator south africa",
      "home loan calculator",
      "bond repayments",
      "home loan interest rate",
      "monthly bond instalment",
      "propertypilot",
      "south africa property",
    ],
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

export function buildGuideSchema(guide: GuideArticle) {
  const pageUrl = buildGuidePageUrl(guide.slug);

  return [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: guide.title,
      description: guide.description,
      datePublished: guide.publishedDate,
      dateModified: guide.updatedDate,
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
      articleSection: guide.tag,
      keywords: [
        "bond calculator",
        "home loan",
        "South Africa",
        "bond repayments",
        "interest rates",
      ].join(", "),
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
          name: guide.title,
          item: pageUrl,
        },
      ],
    },
    {
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
    },
  ];
}
