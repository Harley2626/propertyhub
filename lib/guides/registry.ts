import { bondCalculatorGuide2025 } from "./content/bond-calculator-south-africa-2025";
import { firstTimeHomeBuyerGuide } from "./content/first-time-home-buyer-guide-south-africa";
import { houseAffordabilityGuide } from "./content/how-much-house-can-i-afford-south-africa";
import { rentVsBuyGuide2025 } from "./content/rent-vs-buy-south-africa-2025";
import { transferDutyGuide2025 } from "./content/transfer-duty-calculator-south-africa-2025";
import { getPillarName } from "@/lib/knowledge/pillars";
import type { GuideArticle, GuideSummary } from "./types";

export const guideArticles: GuideArticle[] = [
  bondCalculatorGuide2025,
  transferDutyGuide2025,
  houseAffordabilityGuide,
  rentVsBuyGuide2025,
  firstTimeHomeBuyerGuide,
];

export function getGuideBySlug(slug: string): GuideArticle | undefined {
  return guideArticles.find((guide) => guide.slug === slug);
}

export function getGuideSummaries(): GuideSummary[] {
  return guideArticles.map((guide) => ({
    slug: guide.slug,
    title: guide.title,
    description: guide.description,
    pillar: guide.pillar,
    subtopic: guide.subtopic,
    estimatedReadingTime: guide.estimatedReadingTime,
    lastReviewed: guide.lastReviewed,
    href: `/guides/${guide.slug}`,
  }));
}

/** Legacy tag label derived from pillar for components not yet migrated. */
export function getGuidePillarLabel(pillar: GuideSummary["pillar"]): string {
  return getPillarName(pillar);
}
