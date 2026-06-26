import type { MetadataRoute } from "next";
import { absoluteUrl, siteConfig } from "@/lib/metadata";
import { staticSitePages } from "@/lib/site/pages";
import { toolCategories } from "@/lib/data/tools";
import { guideArticles } from "@/lib/guides/registry";
import { answerArticles } from "@/lib/answers/registry";
import { getAuthorSummaries } from "@/lib/authors/profiles";
import { locationGuides } from "@/lib/areas/registry";
import { contentPillars } from "@/lib/knowledge/pillars";

export default function sitemap(): MetadataRoute.Sitemap {
  const guidePages = guideArticles.map((guide) => ({
    url: absoluteUrl(`/guides/${guide.slug}`),
    lastModified: new Date(guide.lastReviewed ?? guide.updatedDate),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const answerPages = answerArticles.map((answer) => ({
    url: absoluteUrl(`/answers/${answer.slug}`),
    lastModified: new Date(answer.lastReviewed ?? answer.updatedDate),
    changeFrequency: "monthly" as const,
    priority: 0.86,
  }));

  const areaPages = locationGuides.map((guide) => ({
    url: absoluteUrl(`/areas/${guide.slug}`),
    lastModified: new Date(guide.updatedDate),
    changeFrequency: "monthly" as const,
    priority: guide.kind === "suburb" ? 0.82 : 0.85,
  }));

  const toolPages = toolCategories.flatMap((category) =>
    category.tools.map((tool) => ({
      url: absoluteUrl(`/tools/${tool.slug}`),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  );

  const staticPages = staticSitePages.map((page) => ({
    url: absoluteUrl(page.path),
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  const pillarHubPages = contentPillars.map((pillar) => ({
    url: absoluteUrl(`/guides/${pillar.slug}`),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.88,
  }));

  const authorPages = getAuthorSummaries().map((author) => ({
    url: absoluteUrl(author.href),
    lastModified: new Date(author.lastUpdated),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/guides"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/areas"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...staticPages,
    ...authorPages,
    ...pillarHubPages,
    ...guidePages,
    ...answerPages,
    ...areaPages,
    ...toolPages,
  ];
}
