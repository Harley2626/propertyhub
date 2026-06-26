import type { MetadataRoute } from "next";
import { absoluteUrl, siteConfig } from "@/lib/metadata";
import { staticSitePages } from "@/lib/site/pages";
import { toolCategories } from "@/lib/data/tools";
import { guideArticles } from "@/lib/guides/registry";
import { locationGuides } from "@/lib/areas/registry";

export default function sitemap(): MetadataRoute.Sitemap {
  const guidePages = guideArticles.map((guide) => ({
    url: absoluteUrl(`/guides/${guide.slug}`),
    lastModified: new Date(guide.updatedDate),
    changeFrequency: "monthly" as const,
    priority: 0.85,
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
    ...guidePages,
    ...areaPages,
    ...toolPages,
  ];
}
