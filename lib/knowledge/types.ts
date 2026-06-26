/** Primary content pillar slugs — used in URLs and metadata. */
export type ContentPillarSlug =
  | "buying-property"
  | "property-finance"
  | "property-investment"
  | "areas-and-suburbs"
  | "property-data"
  | "calculators";

export type ContentKind = "guide" | "calculator" | "city" | "suburb" | "answer";

export type CatalogItem = {
  kind: ContentKind;
  slug: string;
  title: string;
  description: string;
  href: string;
  pillar: ContentPillarSlug;
  subtopic?: string;
  updatedDate: string;
  featured?: boolean;
  /** Pillars where this item should also surface on hub pages. */
  secondaryPillars?: ContentPillarSlug[];
};

export type ContentSource =
  | { kind: "guide"; slug: string }
  | { kind: "calculator"; slug: string }
  | { kind: "answer"; slug: string }
  | { kind: "city"; slug: string }
  | { kind: "suburb"; slug: string };

export type RelatedContentResult = {
  parentPillar: {
    slug: ContentPillarSlug;
    name: string;
    href: string;
  };
  guides: CatalogItem[];
  calculators: CatalogItem[];
  answers: CatalogItem[];
  cities: CatalogItem[];
  suburbs: CatalogItem[];
  siblings: CatalogItem[];
};

export type PillarHubContent = {
  pillar: ContentPillar;
  featuredGuides: CatalogItem[];
  guides: CatalogItem[];
  calculators: CatalogItem[];
  cities: CatalogItem[];
  suburbs: CatalogItem[];
  recentlyUpdated: CatalogItem[];
};

export type ContentPillar = {
  slug: ContentPillarSlug;
  name: string;
  description: string;
  hubDescription: string;
  subtopics: Record<string, string>;
  featuredGuideSlug?: string;
};
