import Link from "next/link";
import type { Metadata } from "next";
import { getPillarSummariesForIndex } from "@/lib/knowledge/catalog";
import type { ContentPillarSlug } from "@/lib/knowledge/types";
import { absoluteUrl, siteConfig } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Property Knowledge Hub",
  description:
    "Browse PropertyPilot guides by topic — buying property, finance, investment, areas, data, and free calculators for South Africans.",
  alternates: {
    canonical: absoluteUrl("/guides"),
  },
  openGraph: {
    title: `Property Knowledge Hub | ${siteConfig.name}`,
    description:
      "Browse PropertyPilot guides by topic — buying property, finance, investment, areas, data, and free calculators for South Africans.",
    url: absoluteUrl("/guides"),
  },
  twitter: {
    title: `Property Knowledge Hub | ${siteConfig.name}`,
    description:
      "Browse PropertyPilot guides by topic — buying property, finance, investment, areas, data, and free calculators for South Africans.",
  },
};

const pillarStyles: Record<ContentPillarSlug, string> = {
  "buying-property":
    "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300",
  "property-finance":
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300",
  "property-investment":
    "bg-violet-50 text-violet-700 dark:bg-violet-950/50 dark:text-violet-300",
  "areas-and-suburbs":
    "bg-sky-50 text-sky-700 dark:bg-sky-950/50 dark:text-sky-300",
  "property-data":
    "bg-amber-50 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300",
  calculators:
    "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300",
};

export default function GuidesPage() {
  const pillars = getPillarSummariesForIndex();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Knowledge Hub
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Property guides by topic
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">
          Free guides, calculators, and area insights organised by what you are
          trying to learn — built for South African buyers and investors.
        </p>
      </div>

      <div className="mx-auto mt-16 grid max-w-6xl gap-8">
        {pillars.map((pillar) => (
          <section
            key={pillar.slug}
            aria-labelledby={`pillar-${pillar.slug}`}
            className="rounded-2xl border border-border bg-card p-8"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${pillarStyles[pillar.slug]}`}
                >
                  {pillar.guideCount}{" "}
                  {pillar.guideCount === 1 ? "guide" : "guides"}
                </span>
                <h2
                  id={`pillar-${pillar.slug}`}
                  className="mt-4 text-2xl font-semibold tracking-tight text-foreground"
                >
                  {pillar.name}
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                  {pillar.description}
                </p>
              </div>
              <Link
                href={pillar.href}
                className="inline-flex shrink-0 items-center rounded-2xl border border-border bg-muted-bg/50 px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-accent/30 hover:text-accent"
              >
                View all &rarr;
              </Link>
            </div>

            {pillar.featuredGuide ? (
              <Link
                href={pillar.featuredGuide.href}
                className="mt-6 block rounded-xl border border-border/80 bg-muted-bg/40 p-5 transition-colors hover:border-accent/25 hover:bg-muted-bg/70"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                  Featured
                </p>
                <h3 className="mt-2 font-semibold text-foreground">
                  {pillar.featuredGuide.title}
                </h3>
                <p className="mt-1 text-sm text-muted line-clamp-2">
                  {pillar.featuredGuide.description}
                </p>
              </Link>
            ) : null}

            <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted">
              <span>{pillar.calculatorCount} calculators</span>
              <span>{pillar.areaCount} area guides</span>
              {pillar.latestGuide ? (
                <span>
                  Latest update:{" "}
                  {new Intl.DateTimeFormat("en-ZA", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  }).format(new Date(pillar.latestGuide.updatedDate))}
                </span>
              ) : null}
            </div>
          </section>
        ))}
      </div>

      <p className="mx-auto mt-12 max-w-xl text-center text-sm text-muted">
        Area guides also live on the{" "}
        <Link href="/areas" className="font-medium text-accent hover:text-accent-hover">
          areas index
        </Link>
        . Calculators are available from the{" "}
        <Link href="/" className="font-medium text-accent hover:text-accent-hover">
          homepage
        </Link>
        .
      </p>
    </div>
  );
}
