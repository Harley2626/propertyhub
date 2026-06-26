import Link from "next/link";
import type { ContentPillar } from "@/lib/knowledge/types";

type PillarHubHeroProps = {
  pillar: ContentPillar;
  guideCount: number;
  calculatorCount: number;
};

export function PillarHubHero({
  pillar,
  guideCount,
  calculatorCount,
}: PillarHubHeroProps) {
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
          &larr; Knowledge hub
        </Link>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">
            Pillar
          </span>
          <span className="text-sm text-muted">
            {guideCount} {guideCount === 1 ? "guide" : "guides"} · {calculatorCount}{" "}
            {calculatorCount === 1 ? "calculator" : "calculators"}
          </span>
        </div>

        <h1 className="mt-4 max-w-4xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          {pillar.name}
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted">
          {pillar.hubDescription}
        </p>
        <p className="mt-4 text-sm text-muted">
          Browse all {pillar.name.toLowerCase()} resources on PropertyPilot — free
          guides, calculators, and area insights for South Africans.
        </p>
      </div>
    </section>
  );
}
