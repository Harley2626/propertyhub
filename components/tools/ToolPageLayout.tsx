import { ToolHero } from "@/components/tools/ToolHero";
import { CalculatorCard } from "@/components/tools/CalculatorCard";
import { ExplanationSection } from "@/components/tools/ExplanationSection";
import { FAQSection } from "@/components/tools/FAQSection";
import { RelatedContentSection } from "@/components/knowledge/RelatedContentSection";
import { RelatedCalculators } from "@/components/tools/RelatedCalculators";
import type { Tool, ToolCategory } from "@/lib/data/tools";

type ToolPageLayoutProps = {
  tool: Tool;
  category: ToolCategory;
  relatedTools: Tool[];
  calculator?: React.ReactNode;
};

export function ToolPageLayout({
  tool,
  category,
  relatedTools,
  calculator,
}: ToolPageLayoutProps) {
  return (
    <>
      <ToolHero
        title={tool.title}
        description={tool.description}
        category={category}
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-3">
            {calculator ?? (
              <CalculatorCard title={tool.title} fields={tool.fields} />
            )}
          </div>

          <div className="lg:col-span-2">
            <ExplanationSection
              title={tool.explanation.title}
              paragraphs={tool.explanation.paragraphs}
            />
          </div>
        </div>

        <div className="mt-16 space-y-16">
          <FAQSection faqs={tool.faqs} />
          <RelatedCalculators tools={relatedTools} />
          <RelatedContentSection
            source={{ kind: "calculator", slug: tool.slug }}
          />
        </div>
      </div>
    </>
  );
}
