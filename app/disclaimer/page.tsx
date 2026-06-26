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
import { contactConfig, legalLastUpdated } from "@/lib/site/pages";
import { siteConfig } from "@/lib/metadata";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = buildStaticPageMetadata({
  title: "Disclaimer",
  description:
    "PropertyPilot disclaimer — calculators and guides are for educational purposes only. Not financial, legal, or property advice. Verify all information independently.",
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <>
      <JsonLd data={buildPageBreadcrumbSchema("Disclaimer", "/disclaimer")} />
      <PageHero
        label="Legal"
        title="Disclaimer"
        description="Important limitations on how you should use PropertyPilot calculators, guides, and area information."
        meta={`Applies to ${siteConfig.url}`}
      />

      <LegalPageLayout lastUpdated={legalLastUpdated}>
        <LegalSection id="educational" title="Educational purposes only">
          <p>
            PropertyPilot publishes calculators, guides, and area summaries to
            help South Africans understand property and finance concepts. All
            content is provided for <strong>general educational purposes
            only</strong>.
          </p>
          <p>
            Nothing on this website creates a client, advisory, or fiduciary
            relationship between you and PropertyPilot.
          </p>
        </LegalSection>

        <LegalSection id="not-professional" title="Not professional advice">
          <p>PropertyPilot does not provide:</p>
          <ul>
            <li>Financial planning or investment advice</li>
            <li>Legal or conveyancing advice</li>
            <li>Tax advice or SARS rulings</li>
            <li>Property valuations or appraisals</li>
            <li>Estate agency or buyer representation services</li>
          </ul>
          <p>
            PropertyPilot is <strong>not an estate agency</strong> and is{" "}
            <strong>not a financial advisory business</strong> as regulated under
            South African law. We do not buy, sell, let, or manage property on
            your behalf, and we do not recommend specific financial products.
          </p>
        </LegalSection>

        <LegalSection id="accuracy" title="No guarantee of accuracy">
          <p>
            While we strive to keep calculators and guides accurate and current,
            we make <strong>no warranty or guarantee</strong> that any information
            on the Website is complete, correct, or up to date at the time you
            use it.
          </p>
          <p>
            Calculator outputs depend on the figures you enter and on assumptions
            built into each tool. Small input changes or outdated rate tables can
            produce materially different results. Guides and area summaries use
            indicative language and may not reflect conditions on a specific
            property or street.
          </p>
        </LegalSection>

        <LegalSection id="market-conditions" title="Property prices and market conditions">
          <p>
            Property prices, rental levels, and market conditions in South Africa
            change frequently and vary by suburb, building, and property type.
            Any price ranges, yield examples, or market commentary on PropertyPilot
            are <strong>indicative only</strong> and must be verified against
            current listings, rental comparables, and professional advice.
          </p>
          <p>
            Past market behaviour does not predict future performance. We do not
            make representations about capital growth, rental returns, or
            investment outcomes.
          </p>
        </LegalSection>

        <LegalSection id="verify" title="Verify information independently">
          <p>Before making property or finance decisions, you should:</p>
          <ul>
            <li>
              Confirm calculator results with your bank, bond originator, or
              attorney.
            </li>
            <li>
              Verify transfer duty and tax figures with SARS or a qualified tax
              practitioner.
            </li>
            <li>
              Inspect properties in person and review body corporate records,
              title deeds, and compliance certificates.
            </li>
            <li>
              Obtain independent legal and financial advice tailored to your
              situation.
            </li>
          </ul>
        </LegalSection>

        <LegalSection id="liability" title="Limitation of liability">
          <p>
            Your use of PropertyPilot is at your sole risk. To the extent
            permitted by law, PropertyPilot disclaims liability for any loss or
            damage arising from reliance on Website content, including calculator
            outputs, guides, and area guides.
          </p>
          <p>
            For full terms governing use of the Website, see our{" "}
            <Link href="/terms">Terms of Use</Link>.
          </p>
        </LegalSection>

        <LegalSection id="contact" title="Corrections and feedback">
          <p>
            If you believe content on PropertyPilot is inaccurate or outdated,
            please contact us at{" "}
            <a href={`mailto:${contactConfig.email}`}>{contactConfig.email}</a>.
            We welcome corrections that help keep our tools trustworthy for
            South African users.
          </p>
        </LegalSection>
      </LegalPageLayout>
    </>
  );
}
