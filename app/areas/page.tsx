import Link from "next/link";
import type { Metadata } from "next";
import {
  getAllAreaSummaries,
  getAllSuburbSummaries,
} from "@/lib/data/areas";
import { absoluteUrl, siteConfig } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Property Areas",
  description:
    "Explore property market guides for major South African cities and premium suburb guides — prices, neighbourhoods, investment insights, and rental market context.",
  alternates: {
    canonical: absoluteUrl("/areas"),
  },
  openGraph: {
    title: `Property Areas | ${siteConfig.name}`,
    description:
      "Explore property market guides for major South African cities and premium suburb guides — prices, neighbourhoods, investment insights, and rental market context.",
    url: absoluteUrl("/areas"),
  },
  twitter: {
    title: `Property Areas | ${siteConfig.name}`,
    description:
      "Explore property market guides for major South African cities and premium suburb guides — prices, neighbourhoods, investment insights, and rental market context.",
  },
};

function GuideCard({
  slug,
  href,
  title,
  description,
  city,
  province,
  kind,
  suburb,
}: {
  slug: string;
  href: string;
  title: string;
  description: string;
  city: string;
  province: string;
  kind: "city" | "suburb";
  suburb?: string;
}) {
  return (
    <Link
      key={slug}
      href={href}
      className="group flex flex-col rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:border-accent/25 hover:shadow-xl hover:shadow-accent/5"
    >
      <div className="flex items-center justify-between gap-3">
        <span
          className={
            kind === "suburb"
              ? "inline-flex rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700 dark:bg-violet-950/50 dark:text-violet-300"
              : "inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950/50 dark:text-blue-300"
          }
        >
          {kind === "suburb" ? suburb ?? city : city}
        </span>
        <span className="text-xs text-muted">{province}</span>
      </div>
      <h2 className="mt-4 text-xl font-semibold tracking-tight text-foreground group-hover:text-accent">
        {title}
      </h2>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
        {description}
      </p>
      <span className="mt-6 text-sm font-medium text-accent">
        View {kind === "suburb" ? "suburb" : "city"} guide &rarr;
      </span>
    </Link>
  );
}

export default function AreasPage() {
  const cities = getAllAreaSummaries();
  const suburbs = getAllSuburbSummaries();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Areas
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Property guides by location
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">
          Metro overviews and in-depth suburb guides for South African property
          buyers and investors.
        </p>
      </div>

      {cities.length > 0 ? (
        <section className="mx-auto mt-16 max-w-5xl">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            City guides
          </h2>
          <p className="mt-2 text-sm text-muted">
            Market overviews for major metros — suburbs, price bands, and
            investment context.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {cities.map((area) => (
              <GuideCard key={area.slug} {...area} />
            ))}
          </div>
        </section>
      ) : null}

      {suburbs.length > 0 ? (
        <section className="mx-auto mt-16 max-w-5xl">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Suburb guides
          </h2>
          <p className="mt-2 text-sm text-muted">
            Detailed buyer guides for popular Cape Town suburbs — neighbourhoods,
            property types, and local insights.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {suburbs.map((area) => (
              <GuideCard key={area.slug} {...area} />
            ))}
          </div>
        </section>
      ) : null}

      {cities.length === 0 && suburbs.length === 0 ? (
        <p className="mx-auto mt-14 max-w-xl text-center text-muted">
          Location guides are being prepared. Check back soon.
        </p>
      ) : null}
    </div>
  );
}
