import type { ToolCategory } from "@/lib/data/tools";
import { ToolCard } from "@/components/ui/ToolCard";

type CategorySectionProps = {
  category: ToolCategory;
};

const accentStyles = {
  blue: {
    badge: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
    dot: "bg-blue-500",
  },
  emerald: {
    badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
    dot: "bg-emerald-500",
  },
  violet: {
    badge: "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300",
    dot: "bg-violet-500",
  },
};

export function CategorySection({ category }: CategorySectionProps) {
  const styles = accentStyles[category.accent];

  return (
    <section id={category.id} className="scroll-mt-24">
      <div className="mb-8">
        <span
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${styles.badge}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${styles.dot}`} />
          {category.title}
        </span>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {category.title}
        </h2>
        <p className="mt-3 max-w-2xl text-lg text-muted">{category.description}</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {category.tools.map((tool) => (
          <ToolCard key={tool.href} tool={tool} />
        ))}
      </div>
    </section>
  );
}
