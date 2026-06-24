import { GuidePageLayout } from "@/components/guides/GuidePageLayout";
import { GuideHero } from "@/components/guides/GuideHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildGuideMetadata, buildGuideSchema } from "@/lib/guides/guide-page";
import { getGuideBySlug, guideArticles } from "@/lib/guides/registry";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return guideArticles.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return buildGuideMetadata(slug);
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  return (
    <>
      <JsonLd data={buildGuideSchema(guide)} />
      <GuideHero
        title={guide.title}
        description={guide.description}
        tag={guide.tag}
        readTime={guide.readTime}
        updatedDate={guide.updatedDate}
      />
      <GuidePageLayout guide={guide} />
    </>
  );
}
