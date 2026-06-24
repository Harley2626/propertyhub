import { AREA_ADVICE_DISCLAIMER } from "@/lib/areas/defaults";
import Link from "next/link";

type AreaHeroProps = {
  title: string;
  description: string;
  city: string;
  province: string;
  lastReviewed: string;
  suburb?: string;
  parentAreaSlug?: string;
};

export function AreaHero({
  title,
  description,
  city,
  province,
  lastReviewed,
  suburb,
  parentAreaSlug,
}: AreaHeroProps) {
  const formattedDate = new Intl.DateTimeFormat("en-ZA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(lastReviewed));

  return (
    <section className="relative overflow-hidden border-b border-border bg-muted-bg">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <Link
          href="/areas"
          className="inline-flex items-center gap-1 text-sm font-medium text-muted transition-colors hover:text-accent"
        >
          &larr; Back to areas
        </Link>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {suburb ? (
            <span className="inline-flex rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700 dark:bg-violet-950/50 dark:text-violet-300">
              Suburb guide
            </span>
          ) : (
            <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">
              City guide
            </span>
          )}
          <span className="inline-flex rounded-full bg-muted-bg px-3 py-1 text-xs font-semibold text-muted">
            {suburb ? `${suburb}, ${city}` : city} · {province}
          </span>
          <span className="text-sm text-muted">Last reviewed: {formattedDate}</span>
        </div>

        {suburb && parentAreaSlug ? (
          <p className="mt-4 text-sm text-muted">
            Part of the{" "}
            <Link
              href={`/areas/${parentAreaSlug}`}
              className="font-medium text-accent hover:text-accent-hover"
            >
              {city} property market
            </Link>
            .
          </p>
        ) : null}

        <h1 className="mt-4 max-w-4xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted">
          {description}
        </p>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
          {AREA_ADVICE_DISCLAIMER}
        </p>
      </div>
    </section>
  );
}
