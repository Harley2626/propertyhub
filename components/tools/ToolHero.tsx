import Link from "next/link";
import type { ToolCategory } from "@/lib/data/tools";

type ToolHeroProps = {
  title: string;
  description: string;
  category: ToolCategory;
};

export function ToolHero({ title, description, category }: ToolHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-muted-bg">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <Link
          href={`/#${category.id}`}
          className="inline-flex items-center gap-1 text-sm font-medium text-muted transition-colors hover:text-accent"
        >
          &larr; Back to {category.title}
        </Link>

        <span className="mt-6 inline-flex rounded-full bg-accent-light px-3 py-1 text-xs font-semibold text-accent">
          {category.title}
        </span>

        <h1 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
          {description}
        </p>
      </div>
    </section>
  );
}
