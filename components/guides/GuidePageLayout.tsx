import { FAQSection } from "@/components/tools/FAQSection";
import { RelatedContentSection } from "@/components/knowledge/RelatedContentSection";
import { TrustCentreLinks } from "@/components/trust/TrustCentreLinks";
import { Button } from "@/components/ui/Button";
import type { GuideArticle } from "@/lib/guides/types";
import Link from "next/link";

type GuidePageLayoutProps = {
  guide: GuideArticle;
};

export function GuidePageLayout({ guide }: GuidePageLayoutProps) {
  return (
    <>
      <article className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {guide.relatedTool ? (
            <aside className="mb-12 rounded-2xl border border-accent/20 bg-accent-light/50 p-6 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-wider text-accent">
                Free calculator
              </p>
              <h2 className="mt-2 text-xl font-semibold tracking-tight text-foreground">
                Estimate your bond repayment now
              </h2>
              <p className="mt-3 leading-relaxed text-muted">
                Use PropertyPilot&apos;s free{" "}
                <Link
                  href={guide.relatedTool.href}
                  className="font-medium text-accent hover:text-accent-hover"
                >
                  {guide.relatedTool.label}
                </Link>{" "}
                to calculate your monthly instalment, total interest, and
                compare loan terms — updated for South African home loans.
              </p>
              <div className="mt-6">
                <Button href={guide.relatedTool.href}>
                  Open {guide.relatedTool.label}
                </Button>
              </div>
            </aside>
          ) : null}

          <div className="prose-guide space-y-16">
            {guide.sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                aria-labelledby={`${section.id}-heading`}
                className="scroll-mt-28"
              >
                <h2
                  id={`${section.id}-heading`}
                  className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
                >
                  {section.title}
                </h2>
                <div className="mt-6 space-y-4">
                  {section.paragraphs.map((paragraph, index) => (
                    <p key={index} className="leading-relaxed text-muted">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {guide.relatedTool ? (
            <div className="mt-16 rounded-2xl border border-border bg-card p-6 text-center sm:p-8">
              <h2 className="text-xl font-semibold tracking-tight text-foreground">
                Ready to calculate your bond?
              </h2>
              <p className="mt-3 text-muted">
                Enter your loan amount, interest rate, and term in our free
                calculator — no sign-up required.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                <Button href={guide.relatedTool.href}>
                  Use {guide.relatedTool.label}
                </Button>
                {guide.additionalTools?.map((tool) => (
                  <Button key={tool.href} href={tool.href} variant="secondary">
                    {tool.label}
                  </Button>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <div className="mx-auto mt-16 max-w-3xl">
          <FAQSection faqs={guide.faqs} />
          <div className="mt-8 flex justify-center">
            <TrustCentreLinks />
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-3xl">
          <RelatedContentSection
            source={{ kind: "guide", slug: guide.slug }}
            showContinueLearning
          />
        </div>
      </article>
    </>
  );
}
