import type { RelatedGuideLink } from "@/lib/areas/types";
import Link from "next/link";

type RelatedGuidesSectionProps = {
  guides: RelatedGuideLink[];
  city: string;
};

export function RelatedGuidesSection({ guides, city }: RelatedGuidesSectionProps) {
  return (
    <section
      id="related-guides"
      aria-labelledby="related-guides-heading"
      className="scroll-mt-28"
    >
      <h2
        id="related-guides-heading"
        className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
      >
        Related guides
      </h2>
      <p className="mt-3 text-muted">
        Further reading for buyers and investors researching {city} and the
        wider South African property market.
      </p>
      <ul className="mt-6 space-y-3">
        {guides.map((guide) => (
          <li key={guide.href}>
            <Link
              href={guide.href}
              className="group block rounded-xl border border-border bg-card px-5 py-4 transition-colors hover:border-accent/30"
            >
              <span className="font-medium text-foreground group-hover:text-accent">
                {guide.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
