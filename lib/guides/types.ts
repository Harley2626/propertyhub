import type { ContentPillarSlug } from "@/lib/knowledge/types";

/** @deprecated Use pillar for categorisation — retained for badge styling during migration. */
export type GuideTag = "Property" | "Finance" | "Tax";

export type GuideFAQ = {
  question: string;
  answer: string;
};

export type GuideSection = {
  id: string;
  title: string;
  paragraphs: string[];
};

export type GuideArticle = {
  slug: string;
  title: string;
  description: string;
  /** @deprecated Use pillar — kept for legacy references. */
  tag: GuideTag;
  pillar: ContentPillarSlug;
  subtopic?: string;
  secondaryPillars?: ContentPillarSlug[];
  estimatedReadingTime: string;
  publishedDate: string;
  updatedDate: string;
  lastReviewed: string;
  /** @deprecated Use authorSlug — kept for legacy content during migration. */
  reviewedBy?: string;
  authorSlug?: string;
  relatedTool?: {
    slug: string;
    href: string;
    label: string;
  };
  additionalTools?: {
    href: string;
    label: string;
  }[];
  /** Optional manual overrides — related engine fills gaps automatically. */
  relatedGuides?: string[];
  relatedCalculators?: string[];
  relatedAreas?: string[];
  keywords?: string[];
  sections: GuideSection[];
  faqs: GuideFAQ[];
};

export type GuideSummary = Pick<
  GuideArticle,
  | "slug"
  | "title"
  | "description"
  | "pillar"
  | "subtopic"
  | "estimatedReadingTime"
  | "lastReviewed"
> & {
  href: string;
};
