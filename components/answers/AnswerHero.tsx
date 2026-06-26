import Link from "next/link";
import type { ContentPillarSlug } from "@/lib/knowledge/types";
import { getPillarHubPath, getPillarName, getSubtopicLabel } from "@/lib/knowledge/pillars";

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

type AnswerHeroProps = {
  title: string;
  description: string;
  pillar: ContentPillarSlug;
  subtopic?: string;
  lastReviewed: string;
  reviewedBy?: string;
};

export function AnswerHero({
  title,
  description,
  pillar,
  subtopic,
  lastReviewed,
  reviewedBy,
}: AnswerHeroProps) {
  const formattedReviewed = new Intl.DateTimeFormat("en-ZA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(lastReviewed));

  const subtopicLabel = getSubtopicLabel(pillar, subtopic);

  return (
    <section className="relative overflow-hidden border-b border-border bg-muted-bg">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <nav aria-label="Breadcrumb" className="text-sm text-muted">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-accent">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/answers" className="hover:text-accent">
                Answers
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href={getPillarHubPath(pillar)} className="hover:text-accent">
                {getPillarName(pillar)}
              </Link>
            </li>
          </ol>
        </nav>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link
            href={getPillarHubPath(pillar)}
            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold transition-opacity hover:opacity-90 ${pillarStyles[pillar]}`}
          >
            {getPillarName(pillar)}
          </Link>
          {subtopicLabel ? (
            <span className="inline-flex rounded-full bg-muted-bg px-3 py-1 text-xs font-semibold text-muted">
              {subtopicLabel}
            </span>
          ) : null}
          <span className="text-sm text-muted">
            Last reviewed {formattedReviewed}
          </span>
        </div>

        <h1 className="mt-4 max-w-4xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted">
          {description}
        </p>
        <p className="mt-3 text-sm text-muted">
          {reviewedBy ? `Reviewed by ${reviewedBy}` : null}
          {reviewedBy ? " · " : null}
          <Link href="/methodology" className="text-accent hover:text-accent-hover">
            Methodology
          </Link>
          {" · "}
          <Link href="/sources" className="text-accent hover:text-accent-hover">
            Sources
          </Link>
        </p>
      </div>
    </section>
  );
}
