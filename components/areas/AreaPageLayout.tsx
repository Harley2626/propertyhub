import { FAQSection } from "@/components/tools/FAQSection";
import { Button } from "@/components/ui/Button";
import type { AreaGuide } from "@/lib/areas/types";
import Link from "next/link";

type AreaPageLayoutProps = {
  area: AreaGuide;
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
            Indicative price ranges in {area.city}. Figures vary by suburb,
            condition, and property type.
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
                <h3 className="font-semibold text-foreground">{suburb.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {suburb.description}
                </p>
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

        <section
          id="calculators"
          aria-labelledby="calculators-heading"
          className="scroll-mt-28 rounded-2xl border border-accent/20 bg-accent-light/50 p-6 sm:p-8"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            Free tools
          </p>
          <h2
            id="calculators-heading"
            className="mt-2 text-xl font-semibold tracking-tight text-foreground"
          >
            Calculators for {area.city} buyers
          </h2>
          <p className="mt-3 leading-relaxed text-muted">
            Model bond repayments, affordability, rental yield, and transfer
            costs before you buy or invest in {area.city}.
          </p>
          <ul className="mt-6 space-y-4">
            {area.calculatorLinks.map((calc) => (
              <li key={calc.href}>
                <Link
                  href={calc.href}
                  className="group block rounded-xl border border-border/80 bg-card p-4 transition-colors hover:border-accent/30"
                >
                  <span className="font-medium text-foreground group-hover:text-accent">
                    {calc.label}
                  </span>
                  <span className="mt-1 block text-sm text-muted">
                    {calc.description}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <Button href={area.calculatorLinks[0]?.href ?? "/tools/bond-calculator"}>
              Open {area.calculatorLinks[0]?.label ?? "Bond Calculator"}
            </Button>
          </div>
        </section>
      </div>

      <div className="mx-auto mt-16 max-w-3xl">
        <FAQSection faqs={area.faqs} />
      </div>
    </article>
  );
}
