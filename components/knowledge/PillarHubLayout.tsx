import Link from "next/link";
import type { PillarHubContent } from "@/lib/knowledge/types";

type ContentGridProps = {
  title: string;
  items: PillarHubContent["guides"];
  emptyMessage?: string;
  viewAllHref?: string;
};

function ContentGrid({ title, items, emptyMessage, viewAllHref }: ContentGridProps) {
  if (items.length === 0) {
    if (!emptyMessage) return null;
    return (
      <section aria-labelledby={title.replace(/\s+/g, "-").toLowerCase()}>
        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {title}
        </h2>
        <p className="mt-4 text-sm text-muted">{emptyMessage}</p>
      </section>
    );
  }

  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {title}
        </h2>
        {viewAllHref ? (
          <Link
            href={viewAllHref}
            className="text-sm font-medium text-accent hover:text-accent-hover"
          >
            View all &rarr;
          </Link>
        ) : null}
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <Link
            key={`${item.kind}-${item.slug}`}
            href={item.href}
            className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/25 hover:shadow-lg hover:shadow-accent/5"
          >
            <span className="text-xs font-semibold uppercase tracking-wider text-muted">
              {item.kind === "guide"
                ? "Guide"
                : item.kind === "calculator"
                  ? "Calculator"
                  : item.kind === "city"
                    ? "City"
                    : "Suburb"}
            </span>
            <h3 className="mt-2 font-semibold text-foreground group-hover:text-accent">
              {item.title}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted line-clamp-2">
              {item.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

type PillarHubLayoutProps = {
  hub: PillarHubContent;
};

export function PillarHubLayout({ hub }: PillarHubLayoutProps) {
  const { pillar, featuredGuides, guides, calculators, cities, suburbs, recentlyUpdated } =
    hub;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-3xl space-y-16">
        {featuredGuides.length > 0 ? (
          <section aria-labelledby="featured-heading">
            <h2
              id="featured-heading"
              className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
            >
              Featured
            </h2>
            <div className="mt-6">
              {featuredGuides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={guide.href}
                  className="group block rounded-2xl border border-accent/20 bg-accent-light/30 p-8 transition-all hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5"
                >
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                    Featured guide
                  </span>
                  <h3 className="mt-3 text-xl font-semibold text-foreground group-hover:text-accent">
                    {guide.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {guide.description}
                  </p>
                  <span className="mt-4 inline-block text-sm font-medium text-accent">
                    Read guide &rarr;
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <ContentGrid
          title="Guides"
          items={guides.filter((g) => !featuredGuides.some((f) => f.slug === g.slug))}
          emptyMessage={
            pillar.slug === "property-data"
              ? "Market data guides are in development. Browse calculators and area guides in the meantime."
              : "New guides for this topic are in development."
          }
        />

        <ContentGrid
          title="Calculators"
          items={calculators.slice(0, 6)}
          viewAllHref={pillar.slug !== "calculators" ? "/guides/calculators" : undefined}
        />

        <ContentGrid title="City guides" items={cities.slice(0, 4)} viewAllHref="/guides/areas-and-suburbs" />

        <ContentGrid title="Suburb guides" items={suburbs.slice(0, 4)} viewAllHref="/guides/areas-and-suburbs" />

        {recentlyUpdated.length > 0 ? (
          <section aria-labelledby="recent-heading">
            <h2
              id="recent-heading"
              className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
            >
              Recently updated
            </h2>
            <ul className="mt-6 divide-y divide-border rounded-2xl border border-border bg-card">
              {recentlyUpdated.map((item) => (
                <li key={`${item.kind}-${item.slug}`}>
                  <Link
                    href={item.href}
                    className="flex flex-col gap-1 px-6 py-4 transition-colors hover:bg-muted-bg/50 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <span className="font-medium text-foreground">{item.title}</span>
                    <span className="text-sm text-muted">
                      {new Intl.DateTimeFormat("en-ZA", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      }).format(new Date(item.updatedDate))}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </div>
  );
}
