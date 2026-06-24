import { RelatedGuidesSection } from "@/components/areas/RelatedGuidesSection";
import { FAQSection } from "@/components/tools/FAQSection";
import {
  AREA_PRICE_DISCLAIMER,
  defaultAreaCalculatorLinks,
  defaultRelatedGuides,
} from "@/lib/areas/defaults";
import type { CityAreaGuide } from "@/lib/areas/types";
import Link from "next/link";

type AreaPageLayoutProps = {
  area: CityAreaGuide;
};

function ContentSection({
  id,
  title,
  paragraphs,
}: {
  id: string;
  title: string;
  paragraphs: string[];
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="scroll-mt-28"
    >
      <h2
        id={`${id}-heading`}
        className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
      >
        {title}
      </h2>
      <div className="mt-6 space-y-4">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="leading-relaxed text-muted">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}

export function AreaPageLayout({ area }: AreaPageLayoutProps) {
  const calculatorLinks = area.calculatorLinks ?? defaultAreaCalculatorLinks;
  const relatedGuides = area.relatedGuides ?? defaultRelatedGuides;

  return (
    <article className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-3xl space-y-16">
        <section aria-labelledby="average-prices-heading">
          <h2
            id="average-prices-heading"
            className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
          >
            Average property prices
          </h2>
          <p className="mt-3 text-muted">
            Broad indicative ranges for {area.city}. Confirm against current
            listings before making an offer.
          </p>
          <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-muted-bg">
                  <th scope="col" className="px-6 py-4 font-semibold text-foreground">
                    Property type
                  </th>
                  <th scope="col" className="px-6 py-4 font-semibold text-foreground">
                    Price range
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {area.averagePrices.map((row) => (
                  <tr key={row.label}>
                    <td className="px-6 py-4 font-medium text-foreground">
                      {row.label}
                      {row.note ? (
                        <span className="mt-1 block text-xs font-normal text-muted">
                          {row.note}
                        </span>
                      ) : null}
                    </td>
                    <td className="px-6 py-4 text-muted">{row.range}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            {AREA_PRICE_DISCLAIMER}
          </p>
        </section>

        <section aria-labelledby="popular-suburbs-heading">
          <h2
            id="popular-suburbs-heading"
            className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
          >
            Popular suburbs
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {area.popularSuburbs.map((suburb) => (
              <div
                key={suburb.name}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <h3 className="font-semibold text-foreground">
                  {suburb.guideSlug ? (
                    <Link
                      href={`/areas/${suburb.guideSlug}`}
                      className="text-accent hover:text-accent-hover"
                    >
                      {suburb.name}
                    </Link>
                  ) : (
                    suburb.name
                  )}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {suburb.description}
                </p>
                {suburb.guideSlug ? (
                  <Link
                    href={`/areas/${suburb.guideSlug}`}
                    className="mt-3 inline-block text-sm font-medium text-accent hover:text-accent-hover"
                  >
                    Read suburb guide &rarr;
                  </Link>
                ) : null}
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="pros-cons-heading">
          <h2
            id="pros-cons-heading"
            className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
          >
            Pros and cons
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/50 p-6 dark:border-emerald-900/50 dark:bg-emerald-950/20">
              <h3 className="font-semibold text-emerald-800 dark:text-emerald-300">
                Pros
              </h3>
              <ul className="mt-4 space-y-2">
                {area.prosAndCons.pros.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2 text-sm leading-relaxed text-muted"
                  >
                    <span className="mt-0.5 text-emerald-600 dark:text-emerald-400" aria-hidden>
                      +
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-amber-200/80 bg-amber-50/50 p-6 dark:border-amber-900/50 dark:bg-amber-950/20">
              <h3 className="font-semibold text-amber-800 dark:text-amber-300">
                Cons
              </h3>
              <ul className="mt-4 space-y-2">
                {area.prosAndCons.cons.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2 text-sm leading-relaxed text-muted"
                  >
                    <span className="mt-0.5 text-amber-600 dark:text-amber-400" aria-hidden>
                      −
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <ContentSection
          id="market-overview"
          title="Market overview"
          paragraphs={area.marketOverview}
        />

        <ContentSection
          id="property-investment"
          title="Property investment"
          paragraphs={area.propertyInvestment}
        />

        <ContentSection
          id="rental-yield"
          title="Rental yield"
          paragraphs={area.rentalYield}
        />

        <RelatedGuidesSection guides={relatedGuides} city={area.city} />

        <section
          id="calculators"
          aria-labelledby="calculators-heading"
          className="scroll-mt-28 rounded-2xl border border-border bg-card p-6 sm:p-8"
        >
          <h2
            id="calculators-heading"
            className="text-xl font-semibold tracking-tight text-foreground"
          >
            Related calculators
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Free tools to model bond repayments, affordability, rental yield,
            and transfer duty for purchases in {area.city}.
          </p>
          <ul className="mt-6 space-y-3">
            {calculatorLinks.map((calc) => (
              <li key={calc.href}>
                <Link
                  href={calc.href}
                  className="group flex flex-col rounded-xl border border-border/80 bg-muted-bg/50 px-4 py-3 transition-colors hover:border-accent/30 hover:bg-card"
                >
                  <span className="font-medium text-foreground group-hover:text-accent">
                    {calc.label}
                  </span>
                  <span className="text-sm text-muted">{calc.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="mx-auto mt-16 max-w-3xl">
        <FAQSection faqs={area.faqs} />
      </div>
    </article>
  );
}
