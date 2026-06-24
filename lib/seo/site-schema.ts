import { siteConfig } from "@/lib/metadata";
import { toolCategories } from "@/lib/data/tools";

export function buildSiteSchema() {
  const toolUrls = toolCategories.flatMap((category) =>
    category.tools.map((tool) => `${siteConfig.url}/tools/${tool.slug}`),
  );

  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      description: siteConfig.tagline,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
      description: siteConfig.description,
      inLanguage: "en-ZA",
      publisher: {
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.url,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `${siteConfig.name} Calculators`,
      description: siteConfig.tagline,
      numberOfItems: toolUrls.length,
      itemListElement: toolUrls.map((url, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url,
      })),
    },
  ];
}
