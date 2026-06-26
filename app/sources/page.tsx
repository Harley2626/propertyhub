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
  title: "Sources",
  description:
    "Official sources PropertyPilot uses for South African property tax, finance, housing, and economic data — and how we review them.",
  path: "/sources",
});

export default function SourcesPage() {
  return (
    <>
      <JsonLd data={buildPageBreadcrumbSchema("Sources", "/sources")} />
      <PageHero
        label="Trust Centre"
        title="Sources"
        description="Official information sources we use to verify transfer duty, tax, interest rates, and property regulations in South Africa."
        meta="Referenced in answers, guides, and calculators"
      />

      <LegalPageLayout lastUpdated={legalLastUpdated}>
        <LegalSection id="how-we-use-sources" title="How PropertyPilot uses sources">
          <p>
            PropertyPilot cites primary official sources wherever rates, tax
            brackets, or regulatory rules apply. We prefer government and
            regulator publications over news articles or third-party summaries.
          </p>
          <p>
            When official sources conflict with general market practice, we note
            the ambiguity and recommend consulting a qualified professional. See
            our{" "}
            <Link href="/methodology" className="text-accent hover:text-accent-hover">
              methodology
            </Link>{" "}
            for the full review process.
          </p>
        </LegalSection>

        <LegalSection id="taxation" title="Taxation">
          <ul>
            <li>
              <a
                href="https://www.sars.gov.za/types-of-tax/transfer-duty/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent-hover"
              >
                SARS — Transfer duty
              </a>
              {" "}— Progressive transfer duty brackets and exemptions.
            </li>
            <li>
              <a
                href="https://www.sars.gov.za/types-of-tax/value-added-tax/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent-hover"
              >
                SARS — Value-added tax (VAT)
              </a>
              {" "}— 15% standard rate; property developer sales.
            </li>
            <li>
              <a
                href="https://www.sars.gov.za/types-of-tax/personal-income-tax/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent-hover"
              >
                SARS — Personal income tax
              </a>
              {" "}— Tax brackets, rebates, and rates used in income tax calculator.
            </li>
            <li>
              <a
                href="https://www.sars.gov.za/types-of-tax/capital-gains-tax/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent-hover"
              >
                SARS — Capital gains tax
              </a>
              {" "}— Inclusion rates and primary residence exclusion.
            </li>
            <li>
              <a
                href="https://www.sars.gov.za/types-of-tax/personal-income-tax/rental-income/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent-hover"
              >
                SARS — Rental income
              </a>
              {" "}— Declaring rental income and allowable deductions.
            </li>
          </ul>
        </LegalSection>

        <LegalSection id="property-finance" title="Property finance">
          <ul>
            <li>
              <a
                href="https://www.resbank.co.za/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent-hover"
              >
                South African Reserve Bank (SARB)
              </a>
              {" "}— Repo rate, prime lending rate context, monetary policy.
            </li>
            <li>
              <a
                href="https://www.ncr.org.za/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent-hover"
              >
                National Credit Regulator (NCR)
              </a>
              {" "}— National Credit Act, affordability, and consumer lending rules.
            </li>
            <li>
              <a
                href="https://www.nhfc.co.za/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent-hover"
              >
                National Housing Finance Corporation (NHFC)
              </a>
              {" "}— Housing subsidies and first-time buyer programmes.
            </li>
          </ul>
        </LegalSection>

        <LegalSection id="housing-property" title="Housing and property">
          <ul>
            <li>
              <a
                href="https://www.dalrrd.gov.za/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent-hover"
              >
                Department of Agriculture, Land Reform and Rural Development
              </a>
              {" "}— Deeds registration and land administration.
            </li>
            <li>
              <a
                href="https://www.ppra.org.za/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent-hover"
              >
                Property Practitioners Regulatory Authority (PPRA)
              </a>
              {" "}— Estate agent regulation and consumer protection.
            </li>
            <li>
              <a
                href="https://lpc.org.za/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent-hover"
              >
                Legal Practice Council
              </a>
              {" "}— Conveyancing attorneys and legal practitioners.
            </li>
            <li>
              <a
                href="https://salga.org.za/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent-hover"
              >
                South African Local Government Association (SALGA)
              </a>
              {" "}— Municipal rates and local government context.
            </li>
          </ul>
        </LegalSection>

        <LegalSection id="economic-data" title="Economic data">
          <ul>
            <li>
              <a
                href="https://www.statssa.gov.za/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent-hover"
              >
                Statistics South Africa (Stats SA)
              </a>
              {" "}— CPI inflation data referenced in inflation calculator context.
            </li>
            <li>
              <a
                href="https://www.resbank.co.za/en/home/what-we-do/statistics/key-statistics/selected-historical-rates"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent-hover"
              >
                SARB — Selected historical rates
              </a>
              {" "}— Prime and repo rate history.
            </li>
          </ul>
        </LegalSection>

        <LegalSection id="review-process" title="Source review process">
          <p>
            We verify calculator inputs against the sources above when brackets
            or rates change. Answer pages link to specific official sources
            where applicable. If a source moves or is superseded, we update links
            and content in the same review cycle.
          </p>
          <p>
            Report a broken link or outdated reference via{" "}
            <Link href="/contact" className="text-accent hover:text-accent-hover">
              contact
            </Link>
            .
          </p>
        </LegalSection>
      </LegalPageLayout>
    </>
  );
}
