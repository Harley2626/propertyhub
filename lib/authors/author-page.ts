import { absoluteUrl, siteConfig } from "@/lib/metadata";
import { buildBreadcrumbSchema } from "@/lib/site/page-metadata";
import type { Metadata } from "next";
import { buildAuthorPageUrl, getAuthorBySlug } from "./profiles";
import {
  getAuthorCalculatorsReviewed,
  getAuthorPublications,
} from "./publications";
import type { AuthorProfile } from "./types";

export function buildAuthorMetadata(slug: string): Metadata {
  const author = getAuthorBySlug(slug);
  if (!author) return { title: "Author Not Found" };

  const pageUrl = absoluteUrl(buildAuthorPageUrl(author.slug));
  const title = `${author.name} — ${author.role}`;

  return {
    title,
    description: author.shortBio,
    alternates: { canonical: pageUrl },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description: author.shortBio,
      url: pageUrl,
      type: "profile",
      siteName: siteConfig.name,
      locale: siteConfig.locale,
    },
    twitter: {
      card: "summary_large_image",
      title: `${author.name} | ${siteConfig.name}`,
      description: author.shortBio,
    },
  };
}

export function buildPersonSchema(author: AuthorProfile) {
  const pageUrl = absoluteUrl(buildAuthorPageUrl(author.slug));

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${pageUrl}#person`,
    name: author.name,
    jobTitle: author.title,
    description: author.bio,
    url: pageUrl,
    worksFor: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    homeLocation: {
      "@type": "Place",
      name: author.location,
    },
    knowsAbout: author.expertise,
    subjectOf: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
  };
}

export function buildAuthorSchema(author: AuthorProfile) {
  const pageUrl = absoluteUrl(buildAuthorPageUrl(author.slug));
  const person = buildPersonSchema(author);
  const publications = getAuthorPublications(author.slug);
  const calculators = getAuthorCalculatorsReviewed();

  return [
    person,
    {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "@id": pageUrl,
      name: `${author.name} — PropertyPilot Editorial`,
      description: author.shortBio,
      dateModified: author.lastUpdated,
      inLanguage: "en-ZA",
      mainEntity: { "@id": `${pageUrl}#person` },
      isPartOf: {
        "@type": "WebSite",
        name: siteConfig.name,
        url: siteConfig.url,
      },
      about: person,
      hasPart: [
        ...publications.slice(0, 10).map((pub) => ({
          "@type": "Article",
          name: pub.title,
          url: absoluteUrl(pub.href),
          dateModified: pub.lastReviewed,
        })),
        ...calculators.slice(0, 5).map((tool) => ({
          "@type": "WebApplication",
          name: tool.title,
          url: absoluteUrl(tool.href),
        })),
      ],
    },
    buildBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Authors", path: "/authors" },
      { name: author.name, path: buildAuthorPageUrl(author.slug) },
    ]),
  ];
}

/** Schema.org Person node for article author/reviewer attribution. */
export function buildAuthorPersonReference(author: AuthorProfile) {
  return {
    "@type": "Person" as const,
    name: author.name,
    url: absoluteUrl(buildAuthorPageUrl(author.slug)),
    jobTitle: author.title,
    worksFor: {
      "@type": "Organization" as const,
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}
