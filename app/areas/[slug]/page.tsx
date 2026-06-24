import { AreaHero } from "@/components/areas/AreaHero";
import { AreaPageLayout } from "@/components/areas/AreaPageLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildAreaMetadata, buildAreaSchema } from "@/lib/areas/area-page";
import { areaGuides, getAreaBySlug } from "@/lib/areas/registry";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return areaGuides.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return buildAreaMetadata(slug);
}

export default async function AreaPage({ params }: Props) {
  const { slug } = await params;
  const area = getAreaBySlug(slug);
  if (!area) notFound();

  return (
    <>
      <JsonLd data={buildAreaSchema(area)} />
      <AreaHero
        title={area.title}
        description={area.description}
        city={area.city}
        province={area.province}
        lastReviewed={area.lastReviewed}
      />
      <AreaPageLayout area={area} />
    </>
  );
}
