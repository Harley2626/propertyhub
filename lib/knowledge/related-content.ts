import { getGuideBySlug } from "@/lib/guides/registry";
import { getAnswerBySlug } from "@/lib/answers/registry";
import {
  buildContentCatalog,
  getCatalogItem,
} from "./catalog";
import { getPillarHubPath, getPillarName } from "./pillars";
import type {
  CatalogItem,
  ContentPillarSlug,
  ContentSource,
  RelatedContentResult,
} from "./types";

function scoreRelated(
  source: CatalogItem,
  candidate: CatalogItem,
): number {
  if (source.kind === candidate.kind && source.slug === candidate.slug) {
    return -1;
  }

  let score = 0;

  if (candidate.pillar === source.pillar) score += 10;
  if (
    source.secondaryPillars?.includes(candidate.pillar) ||
    candidate.secondaryPillars?.includes(source.pillar)
  ) {
    score += 6;
  }
  if (source.subtopic && candidate.subtopic === source.subtopic) score += 8;
  if (source.pillar !== candidate.pillar && candidate.secondaryPillars?.includes(source.pillar)) {
    score += 5;
  }

  // Prefer variety across kinds at equal scores
  if (candidate.kind !== source.kind) score += 1;

  return score;
}

function resolveSourceItem(source: ContentSource): CatalogItem | undefined {
  return getCatalogItem(source.kind, source.slug);
}

function applyManualOverrides(
  source: ContentSource,
  result: RelatedContentResult,
): RelatedContentResult {
  if (source.kind === "guide") {
    const guide = getGuideBySlug(source.slug);
    if (!guide) return result;

    const catalog = buildContentCatalog();

    const pick = (kind: CatalogItem["kind"], slugs?: string[]) => {
      if (!slugs?.length) return undefined;
      return slugs
        .map((slug) => catalog.find((item) => item.kind === kind && item.slug === slug))
        .filter((item): item is CatalogItem => Boolean(item));
    };

    const relatedGuides = pick("guide", guide.relatedGuides);
    const relatedCalculators = pick("calculator", guide.relatedCalculators);

    let cities = result.cities;
    let suburbs = result.suburbs;
    if (guide.relatedAreas?.length) {
      const areaItems = guide.relatedAreas
        .map((slug) =>
          catalog.find(
            (item) =>
              (item.kind === "city" || item.kind === "suburb") && item.slug === slug,
          ),
        )
        .filter((item): item is CatalogItem => Boolean(item));
      const manualCities = areaItems.filter((item) => item.kind === "city");
      const manualSuburbs = areaItems.filter((item) => item.kind === "suburb");
      if (manualCities.length) cities = mergeUnique(cities, manualCities, 4);
      if (manualSuburbs.length) suburbs = mergeUnique(suburbs, manualSuburbs, 4);
    }

    return {
      ...result,
      guides: relatedGuides?.length ? mergeUnique(result.guides, relatedGuides, 6) : result.guides,
      calculators: relatedCalculators?.length
        ? mergeUnique(result.calculators, relatedCalculators, 6)
        : result.calculators,
      cities,
      suburbs,
    };
  }

  if (source.kind === "answer") {
    const answer = getAnswerBySlug(source.slug);
    if (!answer) return result;

    const catalog = buildContentCatalog();

    const pick = (kind: CatalogItem["kind"], slugs?: string[]) => {
      if (!slugs?.length) return undefined;
      return slugs
        .map((slug) => catalog.find((item) => item.kind === kind && item.slug === slug))
        .filter((item): item is CatalogItem => Boolean(item));
    };

    const relatedGuides = pick("guide", answer.relatedGuides);
    const relatedCalculators = pick("calculator", answer.relatedCalculators);
    const relatedAnswers = pick("answer", answer.relatedAnswers);

    let cities = result.cities;
    let suburbs = result.suburbs;
    if (answer.relatedAreas?.length) {
      const areaItems = answer.relatedAreas
        .map((slug) =>
          catalog.find(
            (item) =>
              (item.kind === "city" || item.kind === "suburb") && item.slug === slug,
          ),
        )
        .filter((item): item is CatalogItem => Boolean(item));
      const manualCities = areaItems.filter((item) => item.kind === "city");
      const manualSuburbs = areaItems.filter((item) => item.kind === "suburb");
      if (manualCities.length) cities = mergeUnique(cities, manualCities, 4);
      if (manualSuburbs.length) suburbs = mergeUnique(suburbs, manualSuburbs, 4);
    }

    return {
      ...result,
      guides: relatedGuides?.length ? mergeUnique(result.guides, relatedGuides, 6) : result.guides,
      calculators: relatedCalculators?.length
        ? mergeUnique(result.calculators, relatedCalculators, 6)
        : result.calculators,
      answers: relatedAnswers?.length
        ? mergeUnique(result.answers, relatedAnswers, 6)
        : result.answers,
      cities,
      suburbs,
    };
  }

  return result;
}

function mergeUnique(
  primary: CatalogItem[],
  overrides: CatalogItem[],
  limit: number,
): CatalogItem[] {
  const seen = new Set<string>();
  const merged: CatalogItem[] = [];
  for (const item of [...overrides, ...primary]) {
    const key = `${item.kind}:${item.slug}`;
    if (seen.has(key)) continue;
    seen.add(key);
    merged.push(item);
    if (merged.length >= limit) break;
  }
  return merged;
}

function rankRelated(
  source: CatalogItem,
  limit: number,
  kind?: CatalogItem["kind"],
): CatalogItem[] {
  return buildContentCatalog()
    .filter((item) => (kind ? item.kind === kind : true))
    .map((item) => ({ item, score: scoreRelated(source, item) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ item }) => item)
    .slice(0, limit);
}

export function getRelatedContent(source: ContentSource): RelatedContentResult {
  const sourceItem = resolveSourceItem(source);
  if (!sourceItem) {
    return {
      parentPillar: {
        slug: "buying-property",
        name: getPillarName("buying-property"),
        href: getPillarHubPath("buying-property"),
      },
      guides: [],
      calculators: [],
      answers: [],
      cities: [],
      suburbs: [],
      siblings: [],
    };
  }

  const pillar = sourceItem.pillar;

  const siblings = buildContentCatalog()
    .filter(
      (item) =>
        item.kind === sourceItem.kind &&
        item.pillar === sourceItem.pillar &&
        item.subtopic === sourceItem.subtopic &&
        item.slug !== sourceItem.slug,
    )
    .slice(0, 4);

  const base: RelatedContentResult = {
    parentPillar: {
      slug: pillar,
      name: getPillarName(pillar),
      href: getPillarHubPath(pillar),
    },
    guides: rankRelated(sourceItem, 4, "guide"),
    calculators: rankRelated(sourceItem, 4, "calculator"),
    answers: rankRelated(sourceItem, 4, "answer"),
    cities: rankRelated(sourceItem, 3, "city"),
    suburbs: rankRelated(sourceItem, 3, "suburb"),
    siblings,
  };

  return applyManualOverrides(source, base);
}

export function hasRelatedContent(result: RelatedContentResult): boolean {
  return (
    result.guides.length > 0 ||
    result.calculators.length > 0 ||
    result.answers.length > 0 ||
    result.cities.length > 0 ||
    result.suburbs.length > 0 ||
    result.siblings.length > 0
  );
}
