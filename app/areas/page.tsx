import Link from "next/link";
import type { Metadata } from "next";
import { getAllAreaSummaries } from "@/lib/data/areas";
import { absoluteUrl, siteConfig } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Property Areas",
  description:
    "Explore property market guides for major South African cities — prices, suburbs, investment insights, and rental yields.",
  alternates: {
    canonical: absoluteUrl("/areas"),
  },
  openGraph: {
    title: `Property Areas | ${siteConfig.name}`,
    description:
      "Explore property market guides for major South African cities — prices, suburbs, investment insights, and rental yields.",
    url: absoluteUrl("/areas"),
  },
  twitter: {
    title: `Property Areas | ${siteConfig.name}`,
    description:
      "Explore property market guides for major South African cities — prices, suburbs, investment insights, and rental yields.",
  },
};

export default function AreasPage() {
  const areas = getAllAreaSummaries();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Areas
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Property guides by city
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">
          Market overviews, suburb insights, and investment analysis for South
          Africa&apos;s major property markets.
        </p>
      </div>

      {areas.length > 0 ? (
        <div className="mx-auto mt-14 grid max-w-5xl gap-6 sm:grid-cols-2">
          {areas.map((area) => (
            <Link
              key={area.slug}
              href={area.href}
              className="group flex flex-col rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:border-accent/25 hover:shadow-xl hover:shadow-accent/5"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">
                  {area.city}
                </span>
                <span className="text-xs text-muted">{area.province}</span>
              </div>
              <h2 className="mt-4 text-xl font-semibold tracking-tight text-foreground group-hover:text-accent">
                {area.title}
              </h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                {area.description}
              </p>
              <span className="mt-6 text-sm font-medium text-accent">
                View area guide &rarr;
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <p className="mx-auto mt-14 max-w-xl text-center text-muted">
          City guides are being prepared. Check back soon for Cape Town,
          Johannesburg, Durban, and Pretoria.
        </p>
      )}
    </div>
  );
}
