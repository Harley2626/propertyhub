import {
  LegalPageLayout,
  LegalSection,
} from "@/components/pages/LegalPageLayout";
import { PageHero } from "@/components/pages/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  buildPageBreadcrumbSchema,
  buildStaticPageMetadata,
} from "@/lib/site/page-metadata";
import { legalLastUpdated } from "@/lib/site/pages";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = buildStaticPageMetadata({
  title: "Methodology",
  description:
    "How PropertyPilot researches, writes, and reviews property answers, calculators, and guides for South African buyers.",
  path: "/methodology",
});

export default function MethodologyPage() {
  return (
    <>
      <JsonLd data={buildPageBreadcrumbSchema("Methodology", "/methodology")} />
      <PageHero
        label="Trust Centre"
        title="Methodology"
        description="How PropertyPilot creates accurate, useful property information for South Africans — and how we keep it current."
        meta="Editorial standards · Calculator methodology · Review policy"
      />

      <LegalPageLayout lastUpdated={legalLastUpdated}>
        <LegalSection id="editorial-standards" title="Editorial standards">
          <p>
            PropertyPilot content is written for South African home buyers,
            investors, and renters — not for generic international audiences.
            Every answer, guide, and calculator page must:
          </p>
          <ul>
            <li>Use plain language with precise South African terminology (bond, transfer duty, sectional title).</li>
            <li>State assumptions clearly and avoid implying financial, legal, or tax advice.</li>
            <li>Link to relevant calculators and guides rather than duplicating long-form content.</li>
            <li>Cite official sources where rates, tax brackets, or regulations apply.</li>
            <li>Disclose limitations — we do not provide property valuations or market forecasts.</li>
          </ul>
          <p>
            Content is reviewed by the PropertyPilot editorial team before
            publication and on a scheduled basis thereafter.
          </p>
        </LegalSection>

        <LegalSection id="calculator-methodology" title="Calculator methodology">
          <p>
            Calculators use deterministic formulas implemented in TypeScript and
            validated against reference scenarios. Key principles:
          </p>
          <ul>
            <li>
              <strong>Bond and affordability:</strong> Standard amortization with
              monthly compounding; affordability uses common bank guidelines (~30%
              of gross income for bond service).
            </li>
            <li>
              <strong>Transfer duty:</strong> SARS progressive brackets effective
              1 April 2025, sourced from official SARS publications.
            </li>
            <li>
              <strong>Income tax and CGT:</strong> SARS 2026/2027 tax tables and
              inclusion rates for individuals.
            </li>
            <li>
              <strong>VAT:</strong> 15% standard rate per SARS.
            </li>
            <li>
              <strong>Property offer guidance:</strong> Rule-based negotiation
              ranges from asking price — not comparable sales or automated
              valuations.
            </li>
          </ul>
          <p>
            Calculator logic lives in <code>lib/calculators/</code> with automated
            regression tests. The intelligence services layer wraps the same
            engine for composed finance calculations.
          </p>
          <p>
            See the{" "}
            <Link href="/disclaimer" className="text-accent hover:text-accent-hover">
              disclaimer
            </Link>{" "}
            for limitations on calculator output.
          </p>
        </LegalSection>

        <LegalSection id="data-review" title="Data review process">
          <p>We review content when:</p>
          <ul>
            <li>SARS announces new transfer duty brackets or tax tables.</li>
            <li>The South African Reserve Bank materially changes the repo or prime rate context we reference.</li>
            <li>Regulations affecting property transfer, NCA lending, or VAT treatment change.</li>
            <li>Users report errors or outdated figures.</li>
          </ul>
          <p>
            Official sources are listed on our{" "}
            <Link href="/sources" className="text-accent hover:text-accent-hover">
              sources page
            </Link>
            . Each answer and guide displays a last reviewed date.
          </p>
        </LegalSection>

        <LegalSection id="last-reviewed" title="Last reviewed policy">
          <p>
            Every answer and guide displays a <strong>last reviewed</strong> date
            reflecting when editorial staff verified rates, links, and accuracy
            against current official sources. Updated dates reflect content
            changes; reviewed dates reflect verification even when wording is
            unchanged.
          </p>
          <p>
            Calculators display a disclaimer that results are estimates. When
            underlying tax or duty brackets change, we update code and re-run
            validation tests before updating review dates.
          </p>
        </LegalSection>

        <LegalSection id="ai-usage" title="AI usage policy">
          <p>
            PropertyPilot may use AI tools to assist with drafting, research
            organisation, and code generation. AI output is never published
            without human editorial review.
          </p>
          <ul>
            <li>All published figures are verified against official sources or tested calculator output.</li>
            <li>We do not publish AI-generated property valuations or market predictions.</li>
            <li>Answers are structured for clarity to humans and search systems — not to mislead either.</li>
          </ul>
        </LegalSection>

        <LegalSection id="corrections" title="Corrections policy">
          <p>
            If you believe content is inaccurate or outdated, contact us via the{" "}
            <Link href="/contact" className="text-accent hover:text-accent-hover">
              contact page
            </Link>
            . We aim to investigate reported errors within five business days.
          </p>
          <p>
            Confirmed errors are corrected promptly. Material corrections to
            calculators trigger test suite re-runs and updated review dates on
            affected pages.
          </p>
        </LegalSection>

        <LegalSection id="update-schedule" title="Content update schedule">
          <ul>
            <li><strong>Tax and duty brackets:</strong> Reviewed when SARS publishes annual changes (typically March/April).</li>
            <li><strong>Answers:</strong> Full catalog review at least quarterly.</li>
            <li><strong>Guides:</strong> Reviewed when related regulations change or annually, whichever is sooner.</li>
            <li><strong>Calculators:</strong> Continuous regression testing on every code change; manual review when formulas change.</li>
          </ul>
        </LegalSection>
      </LegalPageLayout>
    </>
  );
}
