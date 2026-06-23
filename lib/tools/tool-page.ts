import { getToolBySlug } from "@/lib/data/tools";
import { siteConfig } from "@/lib/metadata";
import type { Metadata } from "next";

export function buildToolPageUrl(slug: string): string {
  return `${siteConfig.url}/tools/${slug}`;
}

export function buildToolMetadata(slug: string): Metadata {
  const result = getToolBySlug(slug);
  if (!result) return { title: "Tool Not Found" };

  const { tool, category } = result;
  const pageUrl = buildToolPageUrl(slug);

  return {
    title: tool.title,
    description: tool.description,
    keywords: [
      tool.title.toLowerCase(),
      `${tool.title.toLowerCase()} south africa`,
      category.title.toLowerCase(),
      "propertyhub",
      "free calculator",
    ],
    alternates: { canonical: pageUrl },
    openGraph: {
      title: `${tool.title} | ${siteConfig.name}`,
      description: tool.description,
      url: pageUrl,
      type: "website",
    },
  };
}

export function buildToolSchema(slug: string) {
  const result = getToolBySlug(slug);
  if (!result) return [];

  const { tool, category } = result;
  const pageUrl = buildToolPageUrl(slug);

  return [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: tool.title,
      description: tool.description,
      url: pageUrl,
      applicationCategory: "FinanceApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "ZAR",
      },
      provider: {
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.url,
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
          name: category.title,
          item: `${siteConfig.url}/#${category.id}`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: tool.title,
          item: pageUrl,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: tool.faqs.map((faq) => ({
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
