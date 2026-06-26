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
  title: "Privacy Policy",
  description:
    "PropertyPilot privacy policy — how we collect, use, and protect personal information in compliance with POPIA (South Africa).",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd data={buildPageBreadcrumbSchema("Privacy Policy", "/privacy-policy")} />
      <PageHero
        label="Legal"
        title="Privacy Policy"
        description="How PropertyPilot collects, uses, and protects your information under the Protection of Personal Information Act (POPIA)."
        meta={`Applies to ${siteConfig.url}`}
      />

      <LegalPageLayout lastUpdated={legalLastUpdated}>
        <LegalSection id="introduction" title="1. Introduction">
          <p>
            PropertyPilot (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;)
            operates {siteConfig.url}. This Privacy Policy explains how we handle
            personal information when you use our website, calculators, guides, and
            contact forms.
          </p>
          <p>
            We process personal information in accordance with the Protection of
            Personal Information Act 4 of 2013 (POPIA) and applicable South African
            regulations. By using our website, you acknowledge this policy.
          </p>
        </LegalSection>

        <LegalSection id="responsible-party" title="2. Responsible party">
          <p>
            The responsible party for personal information processed through this
            website is PropertyPilot, based in {contactConfig.location}.
          </p>
          <p>
            Privacy enquiries:{" "}
            <a href={`mailto:${contactConfig.email}`}>{contactConfig.email}</a>
          </p>
        </LegalSection>

        <LegalSection id="information-we-collect" title="3. Information we collect">
          <p>We may collect the following categories of information:</p>
          <ul>
            <li>
              <strong>Contact information</strong> — name and email address when
              you submit our contact form.
            </li>
            <li>
              <strong>Technical information</strong> — IP address, browser type,
              device type, pages visited, and approximate location derived from IP
              (via analytics tools).
            </li>
            <li>
              <strong>Usage data</strong> — interactions with calculators and
              pages, collected in aggregated form where possible.
            </li>
            <li>
              <strong>Cookie data</strong> — preferences such as theme (light/dark
              mode) stored locally in your browser.
            </li>
          </ul>
          <p>
            We do not require account registration to use our calculators. We do
            not intentionally collect special personal information as defined in
            POPIA unless you voluntarily include it in a message to us.
          </p>
        </LegalSection>

        <LegalSection id="how-we-use" title="4. How we use your information">
          <p>We use personal information to:</p>
          <ul>
            <li>Respond to contact and partnership enquiries.</li>
            <li>Improve website performance, content, and user experience.</li>
            <li>Understand aggregate traffic patterns and popular tools.</li>
            <li>Maintain security and prevent abuse of our services.</li>
            <li>Comply with legal obligations.</li>
          </ul>
          <p>
            We do not sell your personal information. We do not use contact
            details for unsolicited marketing without your consent.
          </p>
        </LegalSection>

        <LegalSection id="analytics" title="5. Analytics and Search Console">
          <p>
            In production, we may use <strong>Google Analytics 4</strong> to
            collect aggregated usage statistics. Google Analytics uses cookies and
            similar technologies. Data may be processed on Google&apos;s servers,
            including outside South Africa, under Google&apos;s terms and privacy
            policies.
          </p>
          <p>
            We use analytics only to understand how visitors use PropertyPilot —
            for example, which calculators are most helpful — not to identify you
            personally unless you are logged into a Google account that Google
            associates with analytics data.
          </p>
          <p>
            We use <strong>Google Search Console</strong> to monitor how our site
            appears in Google Search (indexing status, search queries, crawl
            errors). Search Console data is aggregated and does not typically
            include personally identifiable information from individual visitors.
          </p>
          <p>
            You can limit analytics tracking using browser cookie settings, ad
            blockers, or Google&apos;s opt-out tools. Disabling cookies may affect
            theme preference storage on your device.
          </p>
        </LegalSection>

        <LegalSection id="cookies" title="6. Cookies and local storage">
          <p>PropertyPilot may use:</p>
          <ul>
            <li>
              <strong>Essential local storage</strong> — to remember your light or
              dark theme preference.
            </li>
            <li>
              <strong>Analytics cookies</strong> — in production only, when Google
              Analytics is enabled, to measure site usage.
            </li>
          </ul>
          <p>
            We do not use advertising or third-party tracking cookies beyond
            analytics as described above.
          </p>
        </LegalSection>

        <LegalSection id="legal-basis" title="7. Lawful basis for processing">
          <p>Under POPIA, we rely on:</p>
          <ul>
            <li>
              <strong>Consent</strong> — where you submit a contact form or accept
              optional cookies.
            </li>
            <li>
              <strong>Legitimate interest</strong> — to operate, secure, and
              improve our free educational tools, balanced against your privacy
              rights.
            </li>
            <li>
              <strong>Legal obligation</strong> — where required by applicable
              law.
            </li>
          </ul>
        </LegalSection>

        <LegalSection id="retention" title="8. Data retention">
          <p>
            Contact form messages are retained only as long as needed to respond
            and maintain a reasonable record of correspondence, unless a longer
            period is required by law.
          </p>
          <p>
            Analytics data retention follows Google Analytics configuration,
            typically in aggregated form for a limited period.
          </p>
        </LegalSection>

        <LegalSection id="sharing" title="9. Sharing and cross-border transfers">
          <p>
            We may share information with service providers who assist in hosting,
            analytics, or email delivery, subject to appropriate safeguards. Google
            Analytics and Google Search Console may process data outside South
            Africa.
          </p>
          <p>
            We may disclose information if required by law, court order, or to
            protect the rights and safety of PropertyPilot and its users.
          </p>
        </LegalSection>

        <LegalSection id="security" title="10. Security">
          <p>
            We implement reasonable technical and organisational measures to
            protect personal information. No internet transmission is completely
            secure; you share information at your own risk.
          </p>
        </LegalSection>

        <LegalSection id="your-rights" title="11. Your rights under POPIA">
          <p>You have the right to:</p>
          <ul>
            <li>Request access to personal information we hold about you.</li>
            <li>Request correction of inaccurate or incomplete information.</li>
            <li>Request deletion of information where legally permitted.</li>
            <li>Object to processing based on legitimate interest.</li>
            <li>Withdraw consent where processing is consent-based.</li>
            <li>
              Lodge a complaint with the Information Regulator (South Africa) if
              you believe your rights have been violated.
            </li>
          </ul>
          <p>
            To exercise your rights, contact{" "}
            <a href={`mailto:${contactConfig.email}`}>{contactConfig.email}</a>.
            We will respond within a reasonable period as required by POPIA.
          </p>
        </LegalSection>

        <LegalSection id="children" title="12. Children">
          <p>
            PropertyPilot is intended for adults making property and finance
            decisions. We do not knowingly collect personal information from
            children under 18 without parental consent.
          </p>
        </LegalSection>

        <LegalSection id="changes" title="13. Changes to this policy">
          <p>
            We may update this Privacy Policy from time to time. The &ldquo;Last
            updated&rdquo; date at the top of this page indicates the latest
            revision. Continued use of the website after changes constitutes
            acceptance of the updated policy.
          </p>
        </LegalSection>

        <LegalSection id="contact" title="14. Contact us">
          <p>
            Privacy questions or POPIA requests:{" "}
            <a href={`mailto:${contactConfig.email}`}>{contactConfig.email}</a>
          </p>
          <p>
            See also our{" "}
            <Link href="/terms">Terms of Use</Link> and{" "}
            <Link href="/disclaimer">Disclaimer</Link>.
          </p>
        </LegalSection>
      </LegalPageLayout>
    </>
  );
}
