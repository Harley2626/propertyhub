import type { MetadataRoute } from "next";
import { absoluteUrl, siteConfig } from "@/lib/metadata";
import { toolCategories } from "@/lib/data/tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const toolPages = toolCategories.flatMap((category) =>
    category.tools.map((tool) => ({
      url: absoluteUrl(`/tools/${tool.slug}`),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  );

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
    ...toolPages,
  ];
}
