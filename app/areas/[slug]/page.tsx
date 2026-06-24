import { AreaHero } from "@/components/areas/AreaHero";
import { AreaPageLayout } from "@/components/areas/AreaPageLayout";
import { SuburbPageLayout } from "@/components/areas/SuburbPageLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildAreaMetadata, buildAreaSchema } from "@/lib/areas/area-page";
import { getLocationBySlug, locationGuides } from "@/lib/areas/registry";
import { isSuburbGuide } from "@/lib/areas/types";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return locationGuides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return buildAreaMetadata(slug);
}

export default async function AreaPage({ params }: Props) {
  const { slug } = await params;
  const guide = getLocationBySlug(slug);
  if (!guide) notFound();

  return (
    <>
      <JsonLd data={buildAreaSchema(guide)} />
      <AreaHero
        title={guide.title}
        description={guide.description}
        city={guide.city}
        province={guide.province}
        lastReviewed={guide.lastReviewed}
        suburb={isSuburbGuide(guide) ? guide.suburb : undefined}
        parentAreaSlug={
          isSuburbGuide(guide) ? guide.parentAreaSlug : undefined
        }
      />
      {isSuburbGuide(guide) ? (
        <SuburbPageLayout guide={guide} />
      ) : (
        <AreaPageLayout area={guide} />
      )}
    </>
  );
}
