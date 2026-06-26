import Link from "next/link";
import {
  getAuthorCalculatorsReviewed,
  getAuthorPublications,
} from "@/lib/authors/publications";
import type { AuthorProfile } from "@/lib/authors/types";
import { contactConfig } from "@/lib/site/pages";

type AuthorProfileLayoutProps = {
  author: AuthorProfile;
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-ZA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export function AuthorProfileLayout({ author }: AuthorProfileLayoutProps) {
  const publications = getAuthorPublications(author.slug);
  const recentPublications = publications.slice(0, 6);
  const calculators = getAuthorCalculatorsReviewed();

  return (
    <article className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-3xl space-y-16">
        <section aria-labelledby="mission-heading">
          <h2
            id="mission-heading"
            className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
          >
            Mission
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            {author.missionStatement}
          </p>
        </section>

        <section aria-labelledby="principles-heading">
          <h2
            id="principles-heading"
            className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
          >
            Editorial principles
          </h2>
          <ul className="mt-6 space-y-3">
            {author.editorialPrinciples.map((principle) => (
              <li
                key={principle}
                className="flex gap-3 text-muted leading-relaxed"
              >
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  aria-hidden="true"
                />
                {principle}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="expertise-heading">
          <h2
            id="expertise-heading"
            className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
          >
            Areas of expertise
          </h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {author.expertise.map((area) => (
              <span
                key={area}
                className="inline-flex rounded-lg border border-border bg-muted-bg px-3 py-2 text-sm font-medium text-foreground"
              >
                {area}
              </span>
            ))}
          </div>
        </section>

        {recentPublications.length > 0 ? (
          <section aria-labelledby="recent-heading">
            <h2
              id="recent-heading"
              className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
            >
              Recent publications
            </h2>
            <ul className="mt-6 divide-y divide-border rounded-xl border border-border">
              {recentPublications.map((pub) => (
                <li key={`${pub.kind}-${pub.slug}`}>
                  <Link
                    href={pub.href}
                    className="flex flex-col gap-1 px-5 py-4 transition-colors hover:bg-muted-bg sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                        {pub.kind === "guide" ? "Guide" : "Answer"}
                      </p>
                      <p className="mt-1 font-semibold text-foreground">
                        {pub.title}
                      </p>
                    </div>
                    <p className="shrink-0 text-sm text-muted">
                      Reviewed {formatDate(pub.lastReviewed)}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section aria-labelledby="articles-heading">
          <h2
            id="articles-heading"
            className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
          >
            Articles reviewed
          </h2>
          <p className="mt-3 text-muted">
            {publications.length} guides and answers reviewed for accuracy,
            clarity, and South African context.
          </p>
          <ul className="mt-6 columns-1 gap-x-8 sm:columns-2">
            {publications.map((pub) => (
              <li key={`${pub.kind}-${pub.slug}`} className="mb-3 break-inside-avoid">
                <Link
                  href={pub.href}
                  className="text-accent hover:text-accent-hover"
                >
                  {pub.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="calculators-heading">
          <h2
            id="calculators-heading"
            className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
          >
            Calculators reviewed
          </h2>
          <p className="mt-3 text-muted">
            {calculators.length} PropertyPilot calculators validated against
            official South African rules and published assumptions.
          </p>
          <ul className="mt-6 space-y-3">
            {calculators.map((tool) => (
              <li
                key={tool.slug}
                className="rounded-lg border border-border bg-muted-bg px-4 py-3"
              >
                <Link
                  href={tool.href}
                  className="font-medium text-accent hover:text-accent-hover"
                >
                  {tool.title}
                </Link>
                <p className="mt-1 text-sm text-muted">{tool.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section
          aria-labelledby="resources-heading"
          className="rounded-xl border border-border bg-muted-bg p-6 sm:p-8"
        >
          <h2
            id="resources-heading"
            className="text-xl font-bold tracking-tight text-foreground"
          >
            Research & contact
          </h2>
          <p className="mt-3 text-muted">
            See how PropertyPilot validates figures and cites sources, or reach
            out with corrections and editorial enquiries.
          </p>
          <ul className="mt-6 flex flex-wrap gap-4 text-sm font-medium">
            <li>
              <Link href="/methodology" className="text-accent hover:text-accent-hover">
                Methodology →
              </Link>
            </li>
            <li>
              <Link href="/sources" className="text-accent hover:text-accent-hover">
                Sources →
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-accent hover:text-accent-hover">
                Contact →
              </Link>
            </li>
          </ul>
          <p className="mt-4 text-sm text-muted">
            Editorial enquiries:{" "}
            <a
              href={`mailto:${contactConfig.email}`}
              className="text-accent hover:text-accent-hover"
            >
              {contactConfig.email}
            </a>
          </p>
        </section>
      </div>
    </article>
  );
}
