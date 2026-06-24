import { SectionHeader } from "@/components/home/SectionHeader";
import { ToolCard } from "@/components/ui/ToolCard";
import { getFeaturedTools } from "@/lib/data/homepage";
import { toolCategories } from "@/lib/data/tools";

export function FeaturedCalculators() {
  const featured = getFeaturedTools();

  const categoryBySlug = new Map(
    toolCategories.flatMap((category) =>
      category.tools.map((tool) => [tool.slug, category.title] as const),
    ),
  );

  return (
    <section
      aria-labelledby="featured-calculators-heading"
      className="scroll-mt-24"
    >
      <SectionHeader
        id="featured-calculators-heading"
        label="Most popular"
        title="Featured calculators"
        description="Start with the tools South Africans use most when buying property, planning finances, or filing tax."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((tool, index) => (
          <div
            key={tool.slug}
            className="animate-fade-in-up"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <ToolCard
              tool={tool}
              featured
              category={categoryBySlug.get(tool.slug)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
