import Link from "next/link";
import {
  getRelatedContent,
  hasRelatedContent,
} from "@/lib/knowledge/related-content";
import type { CatalogItem, ContentSource } from "@/lib/knowledge/types";

type RelatedContentSectionProps = {
  source: ContentSource;
  title?: string;
  showContinueLearning?: boolean;
};

function ResourceList({
  heading,
  items,
}: {
  heading: string;
  items: CatalogItem[];
}) {
  if (items.length === 0) return null;

  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
        {heading}
      </h3>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={`${item.kind}-${item.slug}`}>
            <Link
              href={item.href}
              className="group flex flex-col rounded-xl border border-border/80 bg-muted-bg/50 px-4 py-3 transition-colors hover:border-accent/30 hover:bg-card"
            >
              <span className="font-medium text-foreground group-hover:text-accent">
                {item.title}
              </span>
              <span className="text-sm text-muted line-clamp-2">
                {item.description}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function RelatedContentSection({
  source,
  title = "Related resources",
  showContinueLearning = true,
}: RelatedContentSectionProps) {
  const related = getRelatedContent(source);
  if (!hasRelatedContent(related)) return null;

  return (
    <section
      aria-labelledby="related-content-heading"
      className="scroll-mt-28 rounded-2xl border border-border bg-card p-6 sm:p-8"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2
            id="related-content-heading"
            className="text-xl font-semibold tracking-tight text-foreground"
          >
            {title}
          </h2>
          <p className="mt-2 text-sm text-muted">
            Part of{" "}
            <Link
              href={related.parentPillar.href}
              className="font-medium text-accent hover:text-accent-hover"
            >
              {related.parentPillar.name}
            </Link>
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <ResourceList heading="Related guides" items={related.guides} />
        <ResourceList heading="Related calculators" items={related.calculators} />
        <ResourceList heading="Property answers" items={related.answers} />
        <ResourceList heading="City guides" items={related.cities} />
        <ResourceList heading="Suburb guides" items={related.suburbs} />
      </div>

      {showContinueLearning && related.siblings.length > 0 ? (
        <div className="mt-10 border-t border-border pt-8">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
            Continue learning
          </h3>
          <ul className="mt-4 flex flex-wrap gap-3">
            {related.siblings.map((item) => (
              <li key={item.slug}>
                <Link
                  href={item.href}
                  className="inline-flex rounded-full border border-border bg-muted-bg/50 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent/30 hover:text-accent"
                >
                  {item.title}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={related.parentPillar.href}
                className="inline-flex rounded-full border border-accent/30 bg-accent-light/50 px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent-light"
              >
                View all {related.parentPillar.name} &rarr;
              </Link>
            </li>
          </ul>
        </div>
      ) : null}
    </section>
  );
}
