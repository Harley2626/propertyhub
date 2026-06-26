import { absoluteUrl, siteConfig } from "@/lib/metadata";
import { buildAuthorPersonReference } from "@/lib/authors/author-page";
import { resolveAuthor } from "@/lib/authors/resolve";
import { getPillarHubPath, getPillarName } from "@/lib/knowledge/pillars";
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
    keywords: guide.keywords ?? [
      "propertypilot",
      "south africa property",
      getPillarName(guide.pillar).toLowerCase(),
    ],
    alternates: { canonical: pageUrl },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url: pageUrl,
      type: "article",
      siteName: siteConfig.name,
      publishedTime: guide.publishedDate,
      modifiedTime: guide.lastReviewed,
      locale: siteConfig.locale,
      section: getPillarName(guide.pillar),
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
  const pillarName = getPillarName(guide.pillar);
  const pillarHubUrl = absoluteUrl(getPillarHubPath(guide.pillar));
  const author = resolveAuthor(guide.authorSlug);
  const authorRef = buildAuthorPersonReference(author);

  return [
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
      author: authorRef,
      editor: authorRef,
      publisher: {
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.url,
      },
      articleSection: pillarName,
      keywords: (guide.keywords ?? [pillarName, "South Africa", "property"]).join(
        ", ",
      ),
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
          name: pillarName,
          item: pillarHubUrl,
        },
        {
          "@type": "ListItem",
          position: 4,
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
