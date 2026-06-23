import { ToolCard } from "@/components/ui/ToolCard";
import type { Tool } from "@/lib/data/tools";

type RelatedCalculatorsProps = {
  tools: Tool[];
};

export function RelatedCalculators({ tools }: RelatedCalculatorsProps) {
  if (tools.length === 0) return null;

  return (
    <section aria-labelledby="related-heading">
      <h2
        id="related-heading"
        className="text-2xl font-bold tracking-tight text-foreground"
      >
        Related calculators
      </h2>
      <p className="mt-2 text-muted">
        Explore other tools that may help with your decision.
      </p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </section>
  );
}
