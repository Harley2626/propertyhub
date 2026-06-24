import Link from "next/link";
import type { Metadata } from "next";
import { guides } from "@/lib/data/guides";

export const metadata: Metadata = {
  title: "Guides",
  description:
    "Property and finance guides for South Africans. Learn about bonds, transfer duty, buying your first home, and more.",
};

const tagStyles = {
  Property: "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300",
  Finance:
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300",
  Tax: "bg-violet-50 text-violet-700 dark:bg-violet-950/50 dark:text-violet-300",
} as const;

export default function GuidesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Guides
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Latest Guides
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">
          Expert articles to help you navigate property and personal finance in
          South Africa.
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-5xl gap-6 sm:grid-cols-2">
        {guides.map((guide) => (
          <Link
            key={guide.title}
            href={guide.href}
            className="group flex flex-col rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:border-accent/25 hover:shadow-xl hover:shadow-accent/5"
          >
            <div className="flex items-center justify-between gap-3">
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${tagStyles[guide.tag]}`}
              >
                {guide.tag}
              </span>
              <span className="text-xs text-muted">{guide.readTime}</span>
            </div>
            <h2 className="mt-4 text-xl font-semibold tracking-tight text-foreground group-hover:text-accent">
              {guide.title}
            </h2>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
              {guide.description}
            </p>
            <span className="mt-6 text-sm font-medium text-accent">
              Read guide &rarr;
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
