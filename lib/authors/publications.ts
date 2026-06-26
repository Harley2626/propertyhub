import { answerArticles } from "@/lib/answers/registry";
import { guideArticles } from "@/lib/guides/registry";
import { toolCategories } from "@/lib/data/tools";
import { resolveAuthorSlug } from "./resolve";
import type { AuthorSlug } from "./types";

export function getAuthorPublications(authorSlug: AuthorSlug) {
  const guides = guideArticles
    .filter((g) => resolveAuthorSlug(g.authorSlug) === authorSlug)
    .map((g) => ({
      kind: "guide" as const,
      slug: g.slug,
      title: g.title,
      description: g.description,
      href: `/guides/${g.slug}`,
      lastReviewed: g.lastReviewed,
    }));

  const answers = answerArticles
    .filter((a) => resolveAuthorSlug(a.authorSlug) === authorSlug)
    .map((a) => ({
      kind: "answer" as const,
      slug: a.slug,
      title: a.title,
      description: a.description,
      href: `/answers/${a.slug}`,
      lastReviewed: a.lastReviewed,
    }));

  return [...guides, ...answers].sort(
    (a, b) =>
      new Date(b.lastReviewed).getTime() - new Date(a.lastReviewed).getTime(),
  );
}

export function getAuthorCalculatorsReviewed() {
  return toolCategories.flatMap((category) =>
    category.tools.map((tool) => ({
      slug: tool.slug,
      title: tool.title,
      description: tool.description,
      href: tool.href,
      category: category.title,
    })),
  );
}
