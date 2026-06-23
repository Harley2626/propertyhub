import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { CalculatorCard } from "@/components/tools/CalculatorCard";
import {
  getRelatedTools,
  getToolBySlug,
  toolCategories,
} from "@/lib/data/tools";
import { getCalculatorComponent } from "@/lib/tools/calculator-registry";
import { buildToolMetadata, buildToolSchema } from "@/lib/tools/tool-page";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createElement } from "react";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return toolCategories.flatMap((category) =>
    category.tools.map((tool) => ({ slug: tool.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return buildToolMetadata(slug);
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  const result = getToolBySlug(slug);
  if (!result) notFound();

  const { tool, category } = result;
  const relatedTools = getRelatedTools(slug);
  const CalculatorComponent = getCalculatorComponent(slug);

  const calculator = CalculatorComponent
    ? createElement(CalculatorComponent)
    : undefined;

  return (
    <>
      <JsonLd data={buildToolSchema(slug)} />
      <ToolPageLayout
        tool={tool}
        category={category}
        relatedTools={relatedTools}
        calculator={
          calculator ?? (
            <CalculatorCard title={tool.title} fields={tool.fields} />
          )
        }
      />
    </>
  );
}
