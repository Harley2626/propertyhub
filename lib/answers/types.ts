import type { ContentPillarSlug } from "@/lib/knowledge/types";

export type AnswerFAQ = {
  question: string;
  answer: string;
};

export type OfficialSource = {
  name: string;
  url: string;
  description?: string;
};

export type AnswerArticle = {
  slug: string;
  /** The question — rendered as H1. */
  title: string;
  description: string;
  pillar: ContentPillarSlug;
  subtopic?: string;
  secondaryPillars?: ContentPillarSlug[];
  /** Direct answer — 50–100 words, featured snippet. */
  shortAnswer: string;
  /** Longer explanation paragraphs. */
  detailedExplanation: string[];
  thingsToKnow: string[];
  commonMistakes: string[];
  relatedCalculators?: string[];
  relatedGuides?: string[];
  relatedAnswers?: string[];
  relatedAreas?: string[];
  faqs: AnswerFAQ[];
  officialSources: OfficialSource[];
  keywords?: string[];
  publishedDate: string;
  updatedDate: string;
  lastReviewed: string;
  reviewedBy?: string;
};

export type AnswerSummary = {
  slug: string;
  title: string;
  description: string;
  href: string;
  pillar: ContentPillarSlug;
  subtopic?: string;
  lastReviewed: string;
};
