import type { AnswerArticle } from "./types";

export const ANSWER_REVIEW_DATE = "2025-06-24";
export const ANSWER_PUBLISHED_DATE = "2025-06-24";
export const ANSWER_REVIEWED_BY = "PropertyPilot Editorial";

/** Apply standard review metadata to answer content objects. */
export function withAnswerDefaults(
  answer: Omit<
    AnswerArticle,
    "publishedDate" | "updatedDate" | "lastReviewed" | "reviewedBy"
  >,
): AnswerArticle {
  return {
    ...answer,
    publishedDate: ANSWER_PUBLISHED_DATE,
    updatedDate: ANSWER_REVIEW_DATE,
    lastReviewed: ANSWER_REVIEW_DATE,
    reviewedBy: ANSWER_REVIEWED_BY,
  };
}
