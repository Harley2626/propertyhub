import { ContactForm } from "@/components/contact/ContactForm";
import { PageHero } from "@/components/pages/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  buildPageBreadcrumbSchema,
  buildStaticPageMetadata,
} from "@/lib/site/page-metadata";
import { contactConfig } from "@/lib/site/pages";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = buildStaticPageMetadata({
  title: "Contact PropertyPilot",
  description:
    "Contact PropertyPilot for questions, feedback, corrections, and partnership enquiries. Based in Cape Town, serving South Africans nationwide.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd data={buildPageBreadcrumbSchema("Contact", "/contact")} />
      <PageHero
        label="Contact"
        title="Get in touch"
        description="Questions about our calculators, guides, or a potential partnership? Send us a message — we are happy to help."
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-5 lg:gap-16">
          <section
            aria-labelledby="contact-form-heading"
            className="lg:col-span-3"
          >
            <h2
              id="contact-form-heading"
              className="text-xl font-semibold tracking-tight text-foreground"
            >
              Send a message
            </h2>
            <p className="mt-2 text-sm text-muted">
              Fields marked as required must be completed. We do not share your
              details with third parties for marketing.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </section>

          <aside className="space-y-8 lg:col-span-2">
            <section aria-labelledby="contact-details-heading">
              <h2
                id="contact-details-heading"
                className="text-xl font-semibold tracking-tight text-foreground"
              >
                Contact details
              </h2>
              <dl className="mt-6 space-y-5">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted">
                    Email
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={`mailto:${contactConfig.email}`}
                      className="text-sm font-medium text-accent hover:text-accent-hover"
                    >
                      {contactConfig.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted">
                    Location
                  </dt>
                  <dd className="mt-1 text-sm text-muted">
                    {contactConfig.location}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted">
                    Business hours
                  </dt>
                  <dd className="mt-1 text-sm text-muted">
                    {contactConfig.businessHours}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted">
                    Response time
                  </dt>
                  <dd className="mt-1 text-sm text-muted">
                    {contactConfig.responseTime}
                  </dd>
                </div>
              </dl>
            </section>

            <section
              aria-labelledby="partnerships-heading"
              className="rounded-2xl border border-border bg-card p-6"
            >
              <h2
                id="partnerships-heading"
                className="text-lg font-semibold text-foreground"
              >
                Partnership enquiries
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                We consider collaborations with property educators, proptech
                platforms, and media outlets that share our commitment to
                independent buyer research. We do not accept paid placement that
                compromises editorial accuracy.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Include &ldquo;Partnership&rdquo; in your subject line or message
                so we can route your enquiry appropriately. You can also email{" "}
                <a
                  href={`mailto:${contactConfig.email}?subject=Partnership%20enquiry`}
                  className="font-medium text-accent hover:text-accent-hover"
                >
                  {contactConfig.email}
                </a>{" "}
                directly.
              </p>
              <p className="mt-4 text-sm text-muted">
                See our{" "}
                <Link
                  href="/about"
                  className="font-medium text-accent hover:text-accent-hover"
                >
                  about page
                </Link>{" "}
                for more on how PropertyPilot works.
              </p>
            </section>
          </aside>
        </div>
      </div>
    </>
  );
}
