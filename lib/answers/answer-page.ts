import { absoluteUrl, siteConfig } from "@/lib/metadata";
import { getPillarHubPath, getPillarName } from "@/lib/knowledge/pillars";
import type { Metadata } from "next";
import { getAnswerBySlug } from "./registry";
import type { AnswerArticle } from "./types";

export function buildAnswerPageUrl(slug: string): string {
  return absoluteUrl(`/answers/${slug}`);
}

export function buildAnswerMetadata(slug: string): Metadata {
  const answer = getAnswerBySlug(slug);
  if (!answer) return { title: "Answer Not Found" };

  const pageUrl = buildAnswerPageUrl(slug);

  return {
    title: answer.title,
    description: answer.description,
    keywords: answer.keywords ?? [
      "propertypilot",
      "south africa property",
      getPillarName(answer.pillar).toLowerCase(),
    ],
    alternates: { canonical: pageUrl },
    openGraph: {
      title: answer.title,
      description: answer.description,
      url: pageUrl,
      type: "article",
      siteName: siteConfig.name,
      publishedTime: answer.publishedDate,
      modifiedTime: answer.lastReviewed,
      locale: siteConfig.locale,
      section: getPillarName(answer.pillar),
    },
    twitter: {
      card: "summary_large_image",
      title: answer.title,
      description: answer.description,
    },
  };
}

export function buildAnswerSchema(answer: AnswerArticle) {
  const pageUrl = buildAnswerPageUrl(answer.slug);
  const pillarName = getPillarName(answer.pillar);
  const pillarHubUrl = absoluteUrl(getPillarHubPath(answer.pillar));

  const faqEntities = [
    {
      "@type": "Question" as const,
      name: answer.title,
      acceptedAnswer: {
        "@type": "Answer" as const,
        text: answer.shortAnswer,
      },
    },
    ...answer.faqs.map((faq) => ({
      "@type": "Question" as const,
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer" as const,
        text: faq.answer,
      },
    })),
  ];

  return [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: answer.title,
      description: answer.shortAnswer,
      datePublished: answer.publishedDate,
      dateModified: answer.lastReviewed,
      inLanguage: "en-ZA",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": pageUrl,
      },
      author: {
        "@type": "Organization",
        name: answer.reviewedBy ?? siteConfig.name,
        url: siteConfig.url,
      },
      publisher: {
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.url,
      },
      articleSection: pillarName,
      keywords: (answer.keywords ?? [pillarName, "South Africa", "property"]).join(
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
          name: "Answers",
          item: absoluteUrl("/answers"),
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
          name: answer.title,
          item: pageUrl,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqEntities,
    },
  ];
}
