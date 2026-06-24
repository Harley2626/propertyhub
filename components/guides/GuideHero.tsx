import Link from "next/link";
import type { GuideTag } from "@/lib/guides/types";

const tagStyles: Record<GuideTag, string> = {
  Property: "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300",
  Finance:
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300",
  Tax: "bg-violet-50 text-violet-700 dark:bg-violet-950/50 dark:text-violet-300",
};

type GuideHeroProps = {
  title: string;
  description: string;
  tag: GuideTag;
  readTime: string;
  updatedDate: string;
};

export function GuideHero({
  title,
  description,
  tag,
  readTime,
  updatedDate,
}: GuideHeroProps) {
  const formattedDate = new Intl.DateTimeFormat("en-ZA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(updatedDate));

  return (
    <section className="relative overflow-hidden border-b border-border bg-muted-bg">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <Link
          href="/guides"
          className="inline-flex items-center gap-1 text-sm font-medium text-muted transition-colors hover:text-accent"
        >
          &larr; Back to guides
        </Link>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${tagStyles[tag]}`}
          >
            {tag}
          </span>
          <span className="text-sm text-muted">{readTime}</span>
          <span className="text-sm text-muted">Updated {formattedDate}</span>
        </div>

        <h1 className="mt-4 max-w-4xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted">
          {description}
        </p>
      </div>
    </section>
  );
}
