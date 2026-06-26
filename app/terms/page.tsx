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
  title: "Terms of Use",
  description:
    "PropertyPilot terms of use — rules for using our calculators, guides, and website. Informational tools only, not financial or legal advice.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <JsonLd data={buildPageBreadcrumbSchema("Terms of Use", "/terms")} />
      <PageHero
        label="Legal"
        title="Terms of Use"
        description="By using PropertyPilot, you agree to these terms. Please read them carefully before relying on our tools or content."
        meta={`Applies to ${siteConfig.url}`}
      />

      <LegalPageLayout lastUpdated={legalLastUpdated}>
        <LegalSection id="acceptance" title="1. Acceptance of terms">
          <p>
            These Terms of Use govern your access to and use of {siteConfig.url}{" "}
            (the &ldquo;Website&rdquo;), operated by PropertyPilot. By accessing
            the Website, you agree to be bound by these terms. If you do not
            agree, please do not use the Website.
          </p>
        </LegalSection>

        <LegalSection id="services" title="2. Description of services">
          <p>
            PropertyPilot provides free online calculators, educational guides,
            and area information related to property and personal finance in
            South Africa. The Website is for general informational purposes.
          </p>
          <p>
            PropertyPilot is not an estate agency, mortgage originator, financial
            services provider, or law firm. We do not facilitate property
            transactions, bond applications, or legal advice.
          </p>
        </LegalSection>

        <LegalSection id="not-advice" title="3. No financial, legal, or property advice">
          <p>
            Content on the Website — including calculator outputs, guides, area
            summaries, and FAQs — is general information only. It does not
            constitute financial advice, legal advice, tax advice, or property
            valuation under South African law.
          </p>
          <p>
            You should consult qualified professionals — such as a registered
            financial advisor, attorney, conveyancer, or estate agent — before
            making property, investment, or financing decisions. Your personal
            circumstances may differ materially from the assumptions used in our
            tools.
          </p>
        </LegalSection>

        <LegalSection id="calculator-accuracy" title="4. Calculator accuracy">
          <p>
            We design calculators to reflect publicly available South African
            rules, rates, and conventions at the time of publication. However:
          </p>
          <ul>
            <li>
              Results are estimates based on the inputs you provide and built-in
              assumptions.
            </li>
            <li>
              Tax brackets, transfer duty thresholds, interest rates, and bank
              lending criteria change over time.
            </li>
            <li>
              Rounding, input errors, and edge cases may produce outputs that
              differ from final figures quoted by banks, SARS, or attorneys.
            </li>
          </ul>
          <p>
            You must independently verify all calculator results before making
            offers, signing agreements, or relying on figures for budgeting.
            PropertyPilot accepts no liability for decisions made on the basis
            of calculator outputs alone.
          </p>
        </LegalSection>

        <LegalSection id="permitted-use" title="5. Permitted use">
          <p>You may use the Website for personal, non-commercial research. You may not:</p>
          <ul>
            <li>
              Scrape, copy, or republish substantial portions of the Website
              without written permission.
            </li>
            <li>
              Reverse-engineer calculators or attempt to access systems
              unlawfully.
            </li>
            <li>
              Use the Website in any way that violates applicable law or infringes
              third-party rights.
            </li>
            <li>
              Misrepresent PropertyPilot content as professional advice or as
              your own authored work.
            </li>
          </ul>
        </LegalSection>

        <LegalSection id="intellectual-property" title="6. Intellectual property">
          <p>
            All content on the Website — including text, design, logos, calculator
            logic, and layout — is owned by PropertyPilot or licensed to us, and
            is protected by copyright and other intellectual property laws.
          </p>
          <p>
            You may share links to our pages and quote brief excerpts with
            attribution. You may not reproduce entire guides, clone our
            calculators for commercial use, or use the PropertyPilot name or
            branding in a way that implies endorsement without permission.
          </p>
        </LegalSection>

        <LegalSection id="third-party" title="7. Third-party links">
          <p>
            The Website may link to external sites. We are not responsible for
            the content, privacy practices, or availability of third-party
            websites. Links do not imply endorsement.
          </p>
        </LegalSection>

        <LegalSection id="disclaimer-warranty" title="8. Disclaimer of warranties">
          <p>
            The Website is provided &ldquo;as is&rdquo; and &ldquo;as
            available&rdquo; without warranties of any kind, whether express or
            implied, including accuracy, completeness, fitness for a particular
            purpose, or uninterrupted availability.
          </p>
        </LegalSection>

        <LegalSection id="limitation" title="9. Limitation of liability">
          <p>
            To the fullest extent permitted by South African law, PropertyPilot
            and its operators shall not be liable for any direct, indirect,
            incidental, consequential, or special damages arising from:
          </p>
          <ul>
            <li>Your use of or inability to use the Website.</li>
            <li>Reliance on calculator results, guides, or area information.</li>
            <li>Errors, omissions, or outdated content.</li>
            <li>Unauthorized access to or alteration of your transmissions.</li>
          </ul>
          <p>
            Nothing in these terms excludes liability that cannot be excluded
            under applicable law.
          </p>
        </LegalSection>

        <LegalSection id="indemnity" title="10. Indemnity">
          <p>
            You agree to indemnify PropertyPilot against claims arising from your
            misuse of the Website or violation of these terms, to the extent
            permitted by law.
          </p>
        </LegalSection>

        <LegalSection id="changes" title="11. Changes to terms">
          <p>
            We may update these Terms of Use at any time. The last updated date
            on this page reflects the current version. Continued use after changes
            constitutes acceptance.
          </p>
        </LegalSection>

        <LegalSection id="governing-law" title="12. Governing law">
          <p>
            These terms are governed by the laws of the Republic of South Africa.
            Disputes shall be subject to the jurisdiction of South African
            courts, unless mandatory consumer protection law provides otherwise.
          </p>
        </LegalSection>

        <LegalSection id="contact" title="13. Contact">
          <p>
            Questions about these terms:{" "}
            <a href={`mailto:${contactConfig.email}`}>{contactConfig.email}</a>
          </p>
          <p>
            See also our{" "}
            <Link href="/privacy-policy">Privacy Policy</Link> and{" "}
            <Link href="/disclaimer">Disclaimer</Link>.
          </p>
        </LegalSection>
      </LegalPageLayout>
    </>
  );
}
