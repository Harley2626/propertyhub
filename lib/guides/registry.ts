import { bondCalculatorGuide2025 } from "./content/bond-calculator-south-africa-2025";
import type { GuideArticle, GuideSummary } from "./types";

export const guideArticles: GuideArticle[] = [bondCalculatorGuide2025];

export function getGuideBySlug(slug: string): GuideArticle | undefined {
  return guideArticles.find((guide) => guide.slug === slug);
}

export function getGuideSummaries(): GuideSummary[] {
  return guideArticles.map((guide) => ({
    slug: guide.slug,
    title: guide.title,
    description: guide.description,
    tag: guide.tag,
    readTime: guide.readTime,
    href: `/guides/${guide.slug}`,
  }));
}
