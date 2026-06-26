import Link from "next/link";
import { AuthorAvatar } from "@/components/authors/AuthorAvatar";
import { PageHero } from "@/components/pages/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAuthorSummaries } from "@/lib/authors/profiles";
import {
  buildBreadcrumbSchema,
  buildStaticPageMetadata,
} from "@/lib/site/page-metadata";
import type { Metadata } from "next";

export const metadata: Metadata = buildStaticPageMetadata({
  title: "Authors & Contributors",
  description:
    "Meet the PropertyPilot editorial team — independent researchers and reviewers covering South African property, finance, and home buying.",
  path: "/authors",
});

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-ZA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export default function AuthorsPage() {
  const authors = getAuthorSummaries();

  return (
    <>
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Authors", path: "/authors" },
        ])}
      />
      <PageHero
        label="Editorial"
        title="Authors & contributors"
        description="PropertyPilot content is researched, reviewed, and maintained by specialists in South African property and finance — independent of sales and commission."
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <ul className="mx-auto grid max-w-5xl gap-8">
          {authors.map((author) => (
            <li key={author.slug}>
              <article className="rounded-2xl border border-border bg-background p-6 shadow-sm transition-shadow hover:shadow-md sm:p-8">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                  <Link href={author.href} className="shrink-0">
                    <AuthorAvatar
                      initials={author.imageInitials}
                      name={author.name}
                      size="lg"
                    />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold uppercase tracking-wide text-accent">
                      {author.role}
                    </p>
                    <h2 className="mt-1 text-2xl font-bold text-foreground">
                      <Link
                        href={author.href}
                        className="hover:text-accent"
                      >
                        {author.name}
                      </Link>
                    </h2>
                    <p className="mt-1 font-medium text-foreground">
                      {author.title}
                    </p>
                    <p className="mt-1 text-sm text-muted">{author.location}</p>
                    <p className="mt-4 leading-relaxed text-muted">
                      {author.shortBio}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {author.expertise.slice(0, 4).map((area) => (
                        <span
                          key={area}
                          className="inline-flex rounded-full bg-muted-bg px-3 py-1 text-xs font-medium text-muted"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                    <p className="mt-4 text-sm text-muted">
                      Profile last updated {formatDate(author.lastUpdated)}
                    </p>
                    <Link
                      href={author.href}
                      className="mt-4 inline-flex text-sm font-semibold text-accent hover:text-accent-hover"
                    >
                      View profile →
                    </Link>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
