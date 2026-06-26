import Link from "next/link";
import type { Metadata } from "next";
import { getAnswerSummaries } from "@/lib/answers/registry";
import { getPillarName } from "@/lib/knowledge/pillars";
import type { ContentPillarSlug } from "@/lib/knowledge/types";
import { absoluteUrl, siteConfig } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Property Answers",
  description:
    "Concise South African property answers — transfer duty, bonds, deposits, rental yield, tax, and buying process explained clearly.",
  alternates: {
    canonical: absoluteUrl("/answers"),
  },
  openGraph: {
    title: `Property Answers | ${siteConfig.name}`,
    description:
      "Concise South African property answers — transfer duty, bonds, deposits, rental yield, tax, and buying process explained clearly.",
    url: absoluteUrl("/answers"),
  },
  twitter: {
    title: `Property Answers | ${siteConfig.name}`,
    description:
      "Concise South African property answers for South African buyers and investors.",
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

const pillarOrder: ContentPillarSlug[] = [
  "buying-property",
  "property-finance",
  "property-investment",
];

export default function AnswersPage() {
  const summaries = getAnswerSummaries();

  const byPillar = pillarOrder.map((pillar) => ({
    pillar,
    answers: summaries.filter((answer) => answer.pillar === pillar),
  }));

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Property Answers
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          South African property questions, answered
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">
          Clear, concise answers on transfer duty, bonds, deposits, tax, and
          buying property — linked to free calculators and in-depth guides.
        </p>
        <p className="mt-4 text-sm text-muted">
          <Link href="/methodology" className="text-accent hover:text-accent-hover">
            How we write and review answers
          </Link>
          {" · "}
          <Link href="/sources" className="text-accent hover:text-accent-hover">
            Official sources
          </Link>
        </p>
      </div>

      <div className="mx-auto mt-16 grid max-w-6xl gap-8">
        {byPillar.map(({ pillar, answers }) => (
          <section
            key={pillar}
            aria-labelledby={`answers-${pillar}`}
            className="rounded-2xl border border-border bg-card p-8"
          >
            <span
              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${pillarStyles[pillar]}`}
            >
              {answers.length} {answers.length === 1 ? "answer" : "answers"}
            </span>
            <h2
              id={`answers-${pillar}`}
              className="mt-4 text-2xl font-semibold tracking-tight text-foreground"
            >
              {getPillarName(pillar)}
            </h2>
            <ul className="mt-6 divide-y divide-border">
              {answers.map((answer) => (
                <li key={answer.slug} className="py-4 first:pt-0 last:pb-0">
                  <Link
                    href={answer.href}
                    className="group block"
                  >
                    <h3 className="font-semibold text-foreground group-hover:text-accent">
                      {answer.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted line-clamp-2">
                      {answer.description}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
