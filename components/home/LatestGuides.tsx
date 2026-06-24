import { SectionHeader } from "@/components/home/SectionHeader";
import { guides } from "@/lib/data/guides";
import Link from "next/link";

const tagStyles = {
  Property: "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300",
  Finance:
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300",
  Tax: "bg-violet-50 text-violet-700 dark:bg-violet-950/50 dark:text-violet-300",
} as const;

export function LatestGuides() {
  const latest = guides.slice(0, 3);

  return (
    <section aria-labelledby="latest-guides-heading" className="scroll-mt-24">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeader
          id="latest-guides-heading"
          label="Guides"
          title="Latest guides"
          description="Expert articles on property, finance, and tax in South Africa."
        />
        <Link
          href="/guides"
          className="mb-10 shrink-0 text-sm font-semibold text-accent transition-colors hover:text-accent-hover sm:mb-12"
        >
          View all guides &rarr;
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {latest.map((guide, index) => (
          <Link
            key={guide.title}
            href={guide.href}
            className="group animate-fade-in-up flex flex-col rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/25 hover:shadow-xl hover:shadow-accent/5"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between gap-3">
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${tagStyles[guide.tag]}`}
              >
                {guide.tag}
              </span>
              <span className="text-xs text-muted">{guide.readTime}</span>
            </div>
            <h3 className="mt-5 text-lg font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-accent">
              {guide.title}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
              {guide.description}
            </p>
            <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-accent">
              Read guide
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
