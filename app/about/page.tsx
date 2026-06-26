import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/pages/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  buildPageBreadcrumbSchema,
  buildStaticPageMetadata,
} from "@/lib/site/page-metadata";
import { contactConfig } from "@/lib/site/pages";
import { siteConfig } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = buildStaticPageMetadata({
  title: "About PropertyPilot",
  description:
    "Learn about PropertyPilot — free property and finance tools built in Cape Town for South Africans. Independent research, no sales agenda.",
  path: "/about",
});

const values = [
  {
    title: "Independence",
    description:
      "We do not sell property, bonds, or financial products. Our tools exist to help you research with clarity — not to steer you toward a commission.",
  },
  {
    title: "Accuracy",
    description:
      "Calculators and guides reflect South African rules, tax brackets, and market context. We review content regularly and label estimates clearly.",
  },
  {
    title: "Accessibility",
    description:
      "Property research should not require expensive software or insider knowledge. PropertyPilot is free to use on any device.",
  },
  {
    title: "Transparency",
    description:
      "We explain how our tools work, what assumptions they use, and where you should verify figures independently before making decisions.",
  },
] as const;

export default function AboutPage() {
  return (
    <>
      <JsonLd data={buildPageBreadcrumbSchema("About", "/about")} />
      <PageHero
        label="About"
        title="Property tools built for South Africans"
        description="PropertyPilot helps buyers, sellers, and investors model costs, compare options, and understand the South African property market — without a sales agenda."
      />

      <article className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-16">
          <section aria-labelledby="mission-heading">
            <h2
              id="mission-heading"
              className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
            >
              Our mission
            </h2>
            <div className="mt-6 space-y-4 text-muted leading-relaxed">
              <p>
                PropertyPilot exists to make property and personal finance
                research clearer for South Africans. Buying a home, comparing
                rent versus bond repayments, or estimating transfer duty should
                not require spreadsheets, guesswork, or pressure from someone
                with something to sell.
              </p>
              <p>
                We publish free calculators, practical guides, and area insights
                so you can explore scenarios at your own pace — whether you are a
                first-time buyer in Durbanville, downsizing on the Atlantic
                Seaboard, or modelling investment yield on a townhouse.
              </p>
            </div>
          </section>

          <section aria-labelledby="why-heading">
            <h2
              id="why-heading"
              className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
            >
              Why we built PropertyPilot
            </h2>
            <div className="mt-6 space-y-4 text-muted leading-relaxed">
              <p>
                South Africa&apos;s property market spans sectional title
                apartments, freestanding suburbs, estates, and regional metros
                with very different price dynamics. Generic international
                calculators rarely reflect SARS transfer duty bands, local bond
                conventions, or the questions buyers actually ask their agents
                and banks.
              </p>
              <p>
                PropertyPilot was created to fill that gap: one place where
                independent research tools and readable guides work together.
                We focus on practical outputs — monthly repayments, affordability
                bands, indicative duty, rental yield — that you can sense-check
                against listings and professional advice before you commit.
              </p>
            </div>
          </section>

          <section aria-labelledby="independent-heading">
            <h2
              id="independent-heading"
              className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
            >
              Independent research, free tools
            </h2>
            <div className="mt-6 space-y-4 text-muted leading-relaxed">
              <p>
                PropertyPilot is not an estate agency, mortgage originator, or
                financial advisory firm. We do not list properties, arrange viewings,
                or recommend specific lenders. Our role is educational: giving you
                numbers and context so your conversations with qualified
                professionals start from a stronger place.
              </p>
              <p>
                All core calculators and guides on {siteConfig.name} are free.
                We may introduce optional features or partnerships in future, but
                we will always distinguish editorial content from sponsored
                material.
              </p>
            </div>
          </section>

          <section aria-labelledby="cape-town-heading">
            <h2
              id="cape-town-heading"
              className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
            >
              Built in Cape Town, for South Africa
            </h2>
            <p className="mt-6 text-muted leading-relaxed">
              PropertyPilot is built in {contactConfig.location}, serving buyers
              and investors across South Africa — from Gauteng semigrants comparing
              Helderberg and northern suburbs, to coastal apartment buyers
              diligencing sectional title levies. Our content reflects South
              African law, currency, and market language — not imported templates
              with the country name swapped in.
            </p>
          </section>

          <section aria-labelledby="values-heading">
            <h2
              id="values-heading"
              className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
            >
              What we stand for
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {values.map((value) => (
                <article
                  key={value.title}
                  className="rounded-2xl border border-border bg-card p-6"
                >
                  <h3 className="font-semibold text-foreground">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {value.description}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section
            aria-labelledby="contact-cta-heading"
            className="rounded-2xl border border-border bg-muted-bg/80 p-8 text-center sm:p-10"
          >
            <h2
              id="contact-cta-heading"
              className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
            >
              Questions or feedback?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted">
              We welcome corrections, feature suggestions, and partnership
              enquiries from organisations aligned with independent buyer education.
            </p>
            <div className="mt-6">
              <Button href="/contact" variant="primary">
                Contact us
              </Button>
            </div>
          </section>
        </div>
      </article>
    </>
  );
}
