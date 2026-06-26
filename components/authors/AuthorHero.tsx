import Link from "next/link";
import type { AuthorProfile } from "@/lib/authors/types";
import { AuthorAvatar } from "./AuthorAvatar";

type AuthorHeroProps = {
  author: AuthorProfile;
};

export function AuthorHero({ author }: AuthorHeroProps) {
  const formattedUpdated = new Intl.DateTimeFormat("en-ZA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(author.lastUpdated));

  return (
    <section className="relative overflow-hidden border-b border-border bg-muted-bg">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <nav aria-label="Breadcrumb" className="text-sm text-muted">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-accent">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/authors" className="hover:text-accent">
                Authors
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-foreground">{author.name}</li>
          </ol>
        </nav>

        <div className="mt-8 flex flex-col gap-8 sm:flex-row sm:items-start">
          <AuthorAvatar
            initials={author.imageInitials}
            name={author.name}
            size="lg"
          />

          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold uppercase tracking-wide text-accent">
              {author.role}
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {author.name}
            </h1>
            <p className="mt-2 text-lg font-medium text-foreground">
              {author.title}
            </p>
            <p className="mt-1 text-muted">{author.location}</p>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted">
              {author.bio}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {author.researchFocus.map((focus) => (
                <span
                  key={focus}
                  className="inline-flex rounded-full bg-background px-3 py-1 text-xs font-semibold text-foreground ring-1 ring-border"
                >
                  {focus}
                </span>
              ))}
            </div>

            <p className="mt-6 text-sm text-muted">
              Last updated {formattedUpdated}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
