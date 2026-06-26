import { PillarHubHero } from "@/components/knowledge/PillarHubHero";
import { PillarHubLayout } from "@/components/knowledge/PillarHubLayout";
import { GuidePageLayout } from "@/components/guides/GuidePageLayout";
import { GuideHero } from "@/components/guides/GuideHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { getPillarHubContent } from "@/lib/knowledge/catalog";
import {
  buildPillarHubMetadata,
  buildPillarHubSchema,
} from "@/lib/knowledge/pillar-hub-page";
import { contentPillars, isPillarSlug } from "@/lib/knowledge/pillars";
import { buildGuideMetadata, buildGuideSchema } from "@/lib/guides/guide-page";
import { getGuideBySlug, guideArticles } from "@/lib/guides/registry";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return [
    ...guideArticles.map((guide) => ({ slug: guide.slug })),
    ...contentPillars.map((pillar) => ({ slug: pillar.slug })),
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (isPillarSlug(slug)) return buildPillarHubMetadata(slug);
  return buildGuideMetadata(slug);
}

export default async function GuideSlugPage({ params }: Props) {
  const { slug } = await params;

  if (isPillarSlug(slug)) {
    const hub = getPillarHubContent(slug);
    if (!hub) notFound();

    return (
      <>
        <JsonLd data={buildPillarHubSchema(slug)} />
        <PillarHubHero
          pillar={hub.pillar}
          guideCount={hub.guides.length}
          calculatorCount={hub.calculators.length}
        />
        <PillarHubLayout hub={hub} />
      </>
    );
  }

  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  return (
    <>
      <JsonLd data={buildGuideSchema(guide)} />
      <GuideHero
        title={guide.title}
        description={guide.description}
        pillar={guide.pillar}
        subtopic={guide.subtopic}
        estimatedReadingTime={guide.estimatedReadingTime}
        updatedDate={guide.updatedDate}
        lastReviewed={guide.lastReviewed}
        authorSlug={guide.authorSlug}
      />
      <GuidePageLayout guide={guide} />
    </>
  );
}
