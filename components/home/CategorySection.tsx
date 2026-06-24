import type { ToolCategory } from "@/lib/data/tools";
import { ToolCard } from "@/components/ui/ToolCard";

type CategorySectionProps = {
  category: ToolCategory;
};

const accentStyles = {
  blue: {
    badge: "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300",
    dot: "bg-blue-500",
  },
  emerald: {
    badge:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300",
    dot: "bg-emerald-500",
  },
  violet: {
    badge:
      "bg-violet-50 text-violet-700 dark:bg-violet-950/50 dark:text-violet-300",
    dot: "bg-violet-500",
  },
};

export function CategorySection({ category }: CategorySectionProps) {
  const styles = accentStyles[category.accent];

  return (
    <section id={category.id} className="scroll-mt-28" aria-labelledby={`${category.id}-heading`}>
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${styles.badge}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${styles.dot}`} />
            {category.title}
          </span>
          <h2
            id={`${category.id}-heading`}
            className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            {category.title}
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {category.description}
          </p>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {category.tools.map((tool, index) => (
          <div
            key={tool.href}
            className="animate-fade-in-up"
            style={{ animationDelay: `${index * 60}ms` }}
          >
            <ToolCard tool={tool} category={category.title} />
          </div>
        ))}
      </div>
    </section>
  );
}
