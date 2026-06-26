import { buyingPropertyAnswers } from "./content/buying-property";
import { financeAndInvestmentAnswers } from "./content/finance-investment";
import type { AnswerArticle, AnswerSummary } from "./types";

export const answerArticles: AnswerArticle[] = [
  ...buyingPropertyAnswers,
  ...financeAndInvestmentAnswers,
];

export function getAnswerBySlug(slug: string): AnswerArticle | undefined {
  return answerArticles.find((answer) => answer.slug === slug);
}

export function getAnswerSummaries(): AnswerSummary[] {
  return answerArticles.map((answer) => ({
    slug: answer.slug,
    title: answer.title,
    description: answer.description,
    href: `/answers/${answer.slug}`,
    pillar: answer.pillar,
    subtopic: answer.subtopic,
    lastReviewed: answer.lastReviewed,
  }));
}

export function getAnswersByPillar(
  pillar: AnswerArticle["pillar"],
): AnswerSummary[] {
  return getAnswerSummaries().filter((answer) => answer.pillar === pillar);
}
