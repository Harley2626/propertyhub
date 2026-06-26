import { FAQSection } from "@/components/tools/FAQSection";
import { RelatedContentSection } from "@/components/knowledge/RelatedContentSection";
import {
  AREA_PRICE_DISCLAIMER,
  defaultSuburbResources,
} from "@/lib/areas/defaults";
import type { SuburbGuide } from "@/lib/areas/types";
import Link from "next/link";

type SuburbPageLayoutProps = {
  guide: SuburbGuide;
};

function Section({
  id,
  title,
  paragraphs,
}: {
  id: string;
  title: string;
  paragraphs: string[];
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-28">
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

export function SuburbPageLayout({ guide }: SuburbPageLayoutProps) {
  const resources = guide.relatedResources ?? defaultSuburbResources;

  return (
    <article className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-3xl space-y-16">
        <Section id="overview" title="Overview" paragraphs={guide.overview} />

        <Section
          id="why-buy-here"
          title="Why people buy here"
          paragraphs={guide.whyBuyHere}
        />

        <section aria-labelledby="neighbourhoods-heading">
          <h2
            id="neighbourhoods-heading"
            className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
          >
            Popular areas and neighbourhoods
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {guide.neighbourhoods.map((area) => (
              <div
                key={area.name}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <h3 className="font-semibold text-foreground">{area.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {area.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <Section
          id="property-types"
          title="Property types"
          paragraphs={guide.propertyTypes}
        />

        {guide.indicativePrices && guide.indicativePrices.length > 0 ? (
          <section aria-labelledby="indicative-prices-heading">
            <h2
              id="indicative-prices-heading"
              className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
            >
              Indicative price ranges
            </h2>
            <p className="mt-3 text-muted">
              Broad ranges for {guide.suburb}. Confirm against current listings
              before making an offer.
            </p>
            <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted-bg">
                    <th
                      scope="col"
                      className="px-6 py-4 font-semibold text-foreground"
                    >
                      Property type
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 font-semibold text-foreground"
                    >
                      Indicative range
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {guide.indicativePrices.map((row) => (
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
        ) : null}

        <Section
          id="lifestyle"
          title="Lifestyle and amenities"
          paragraphs={guide.lifestyleAmenities}
        />

        <Section
          id="investment"
          title="Investment potential"
          paragraphs={guide.investmentPotential}
        />

        <Section
          id="rental-market"
          title="Rental market"
          paragraphs={guide.rentalMarket}
        />

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
                {guide.prosAndCons.pros.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2 text-sm leading-relaxed text-muted"
                  >
                    <span
                      className="mt-0.5 text-emerald-600 dark:text-emerald-400"
                      aria-hidden
                    >
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
                {guide.prosAndCons.cons.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2 text-sm leading-relaxed text-muted"
                  >
                    <span
                      className="mt-0.5 text-amber-600 dark:text-amber-400"
                      aria-hidden
                    >
                      −
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="best-suited" aria-labelledby="best-suited-heading">
          <h2
            id="best-suited-heading"
            className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
          >
            Who this suburb is best suited for
          </h2>
          <ul className="mt-6 space-y-3">
            {guide.bestSuitedFor.map((item) => (
              <li
                key={item}
                className="flex gap-3 rounded-xl border border-border bg-card px-5 py-4 text-sm leading-relaxed text-muted"
              >
                <span className="font-medium text-accent" aria-hidden>
                  →
                </span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section
          id="related-resources"
          aria-labelledby="related-resources-heading"
          className="scroll-mt-28 rounded-2xl border border-border bg-card p-6 sm:p-8"
        >
          <h2
            id="related-resources-heading"
            className="text-xl font-semibold tracking-tight text-foreground"
          >
            Related calculators and guides
          </h2>
          <p className="mt-3 text-sm text-muted">
            Tools and reading to help you plan a purchase in {guide.suburb}.
          </p>
          <ul className="mt-6 space-y-3">
            {resources.map((resource) => (
              <li key={resource.href}>
                <Link
                  href={resource.href}
                  className="group flex flex-col rounded-xl border border-border/80 bg-muted-bg/50 px-4 py-3 transition-colors hover:border-accent/30 hover:bg-card"
                >
                  <span className="font-medium text-foreground group-hover:text-accent">
                    {resource.label}
                  </span>
                  {resource.description ? (
                    <span className="text-sm text-muted">
                      {resource.description}
                    </span>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted">
            See also our{" "}
            <Link
              href={`/areas/${guide.parentAreaSlug}`}
              className="font-medium text-accent hover:text-accent-hover"
            >
              {guide.city} area guide
            </Link>{" "}
            for metro-wide context.
          </p>
        </section>
      </div>

      <div className="mx-auto mt-16 max-w-3xl">
        <FAQSection faqs={guide.faqs} />
      </div>

      <div className="mx-auto mt-16 max-w-3xl">
        <RelatedContentSection
          source={{ kind: "suburb", slug: guide.slug }}
        />
      </div>
    </article>
  );
}
