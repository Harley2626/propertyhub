import { cityGuides, locationGuides } from "@/lib/areas/registry";
import { guideArticles } from "@/lib/guides/registry";
import { toolCategories } from "@/lib/data/tools";
import { contentPillars, getPillarBySlug } from "./pillars";
import type { CatalogItem, ContentKind, ContentPillarSlug } from "./types";

/** Calculator pillar metadata — primary pillar is always calculators. */
const calculatorCatalogMeta: Record<
  string,
  { subtopic?: string; secondaryPillars?: ContentPillarSlug[]; featured?: boolean }
> = {
  "transfer-duty-calculator": {
    subtopic: "property",
    secondaryPillars: ["buying-property", "property-finance"],
    featured: true,
  },
  "bond-calculator": {
    subtopic: "property",
    secondaryPillars: ["property-finance", "buying-property"],
    featured: true,
  },
  "affordability-calculator": {
    subtopic: "property",
    secondaryPillars: ["property-finance", "buying-property"],
    featured: true,
  },
  "rental-yield-calculator": {
    subtopic: "property",
    secondaryPillars: ["property-investment"],
  },
  "deposit-calculator": {
    subtopic: "property",
    secondaryPillars: ["buying-property", "property-finance"],
  },
  "rent-vs-buy-calculator": {
    subtopic: "property",
    secondaryPillars: ["property-investment", "buying-property"],
    featured: true,
  },
  "compound-interest-calculator": {
    subtopic: "finance",
    secondaryPillars: ["property-finance"],
  },
  "retirement-calculator": {
    subtopic: "finance",
    secondaryPillars: ["property-finance"],
  },
  "inflation-calculator": {
    subtopic: "finance",
    secondaryPillars: ["property-finance", "property-data"],
  },
  "emergency-fund-calculator": {
    subtopic: "finance",
    secondaryPillars: ["property-finance"],
  },
  "income-tax-calculator": {
    subtopic: "tax",
    secondaryPillars: ["property-finance"],
  },
  "vat-calculator": {
    subtopic: "tax",
    secondaryPillars: ["buying-property"],
  },
  "capital-gains-tax-calculator": {
    subtopic: "tax",
    secondaryPillars: ["property-investment", "property-finance"],
  },
};

const CALCULATOR_UPDATED = "2025-06-24";

function buildCalculatorCatalog(): CatalogItem[] {
  return toolCategories.flatMap((category) =>
    category.tools.map((tool) => {
      const meta = calculatorCatalogMeta[tool.slug] ?? {
        subtopic: "property",
      };
      return {
        kind: "calculator" as const,
        slug: tool.slug,
        title: tool.title,
        description: tool.description,
        href: tool.href,
        pillar: "calculators" as const,
        subtopic: meta.subtopic,
        updatedDate: CALCULATOR_UPDATED,
        featured: meta.featured,
        secondaryPillars: meta.secondaryPillars,
      };
    }),
  );
}

function buildGuideCatalog(): CatalogItem[] {
  return guideArticles.map((guide) => ({
    kind: "guide" as const,
    slug: guide.slug,
    title: guide.title,
    description: guide.description,
    href: `/guides/${guide.slug}`,
    pillar: guide.pillar,
    subtopic: guide.subtopic,
    updatedDate: guide.lastReviewed ?? guide.updatedDate,
    featured: contentPillars.some((p) => p.featuredGuideSlug === guide.slug),
    secondaryPillars: guide.secondaryPillars,
  }));
}

function buildAreaCatalog(): CatalogItem[] {
  return locationGuides.map((guide) => ({
    kind: (guide.kind === "city" ? "city" : "suburb") as ContentKind,
    slug: guide.slug,
    title: guide.title,
    description: guide.description,
    href: `/areas/${guide.slug}`,
    pillar: "areas-and-suburbs" as const,
    subtopic: guide.kind === "city" ? "cities" : "suburbs",
    updatedDate: guide.lastReviewed ?? guide.updatedDate,
    featured: cityGuides.some((c) => c.slug === guide.slug),
    secondaryPillars:
      guide.kind === "suburb"
        ? (["buying-property", "property-investment"] as ContentPillarSlug[])
        : (["buying-property"] as ContentPillarSlug[]),
  }));
}

let cachedCatalog: CatalogItem[] | null = null;

export function buildContentCatalog(): CatalogItem[] {
  if (cachedCatalog) return cachedCatalog;
  cachedCatalog = [
    ...buildGuideCatalog(),
    ...buildCalculatorCatalog(),
    ...buildAreaCatalog(),
  ];
  return cachedCatalog;
}

export function getCatalogItem(
  kind: ContentKind,
  slug: string,
): CatalogItem | undefined {
  return buildContentCatalog().find(
    (item) => item.kind === kind && item.slug === slug,
  );
}

export function getCatalogItemsByPillar(
  pillar: ContentPillarSlug,
): CatalogItem[] {
  return buildContentCatalog().filter(
    (item) =>
      item.pillar === pillar ||
      item.secondaryPillars?.includes(pillar) ||
      (pillar === "calculators" && item.kind === "calculator"),
  );
}

export function getGuidesByPillar(pillar: ContentPillarSlug): CatalogItem[] {
  return buildContentCatalog().filter(
    (item) => item.kind === "guide" && item.pillar === pillar,
  );
}

export function getCalculatorsForPillar(
  pillar: ContentPillarSlug,
): CatalogItem[] {
  if (pillar === "calculators") {
    return buildContentCatalog().filter((item) => item.kind === "calculator");
  }
  return buildContentCatalog().filter(
    (item) =>
      item.kind === "calculator" &&
      (item.secondaryPillars?.includes(pillar) ?? false),
  );
}

export function getCitiesForPillar(pillar: ContentPillarSlug): CatalogItem[] {
  const cities = buildContentCatalog().filter((item) => item.kind === "city");
  if (pillar === "areas-and-suburbs") return cities;
  return cities.filter((item) => item.secondaryPillars?.includes(pillar));
}

export function getSuburbsForPillar(pillar: ContentPillarSlug): CatalogItem[] {
  const suburbs = buildContentCatalog().filter((item) => item.kind === "suburb");
  if (pillar === "areas-and-suburbs") return suburbs;
  return suburbs.filter((item) => item.secondaryPillars?.includes(pillar));
}

export function getPillarHubContent(pillarSlug: ContentPillarSlug) {
  const pillar = getPillarBySlug(pillarSlug);
  if (!pillar) return undefined;

  const guides = getGuidesByPillar(pillarSlug);
  const featuredGuides = guides.filter((g) => g.featured);
  const calculators = getCalculatorsForPillar(pillarSlug);
  const cities = getCitiesForPillar(pillarSlug);
  const suburbs = getSuburbsForPillar(pillarSlug);

  const recentlyUpdated = getCatalogItemsByPillar(pillarSlug)
    .slice()
    .sort(
      (a, b) =>
        new Date(b.updatedDate).getTime() - new Date(a.updatedDate).getTime(),
    )
    .slice(0, 8);

  return {
    pillar,
    featuredGuides:
      featuredGuides.length > 0
        ? featuredGuides
        : guides.slice(0, 1),
    guides,
    calculators,
    cities,
    suburbs,
    recentlyUpdated,
  };
}

export function getPillarSummariesForIndex() {
  return contentPillars.map((pillar) => {
    const guides = getGuidesByPillar(pillar.slug);
    const latest = guides
      .slice()
      .sort(
        (a, b) =>
          new Date(b.updatedDate).getTime() - new Date(a.updatedDate).getTime(),
      )[0];
    const featured =
      guides.find((g) => g.slug === pillar.featuredGuideSlug) ?? guides[0];

    return {
      ...pillar,
      href: `/guides/${pillar.slug}`,
      guideCount: guides.length,
      calculatorCount: getCalculatorsForPillar(pillar.slug).length,
      areaCount:
        getCitiesForPillar(pillar.slug).length +
        getSuburbsForPillar(pillar.slug).length,
      featuredGuide: featured,
      latestGuide: latest,
    };
  });
}
