import Link from "next/link";
import { resolveAuthor } from "@/lib/authors/resolve";
import { AuthorAvatar } from "./AuthorAvatar";

type AuthorAttributionProps = {
  authorSlug?: string;
  lastReviewed: string;
  variant?: "inline" | "card";
};

function formatReviewDate(date: string) {
  return new Intl.DateTimeFormat("en-ZA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export function AuthorAttribution({
  authorSlug,
  lastReviewed,
  variant = "inline",
}: AuthorAttributionProps) {
  const author = resolveAuthor(authorSlug);
  const formattedReviewed = formatReviewDate(lastReviewed);
  const authorHref = `/authors/${author.slug}`;

  if (variant === "card") {
    return (
      <aside
        className="rounded-xl border border-border bg-muted-bg p-5"
        aria-label="Editorial review"
      >
        <div className="flex items-start gap-4">
          <Link href={authorHref} className="shrink-0 transition-opacity hover:opacity-90">
            <AuthorAvatar
              initials={author.imageInitials}
              name={author.name}
              size="md"
            />
          </Link>
          <div className="min-w-0 space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">
              Reviewed by
            </p>
            <p className="text-base font-semibold text-foreground">
              <Link href={authorHref} className="text-accent hover:text-accent-hover">
                {author.name}
              </Link>
            </p>
            <p className="text-sm text-muted">{author.title}</p>
            <p className="text-sm text-muted">
              Last reviewed {formattedReviewed}
            </p>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <span className="inline-flex flex-wrap items-center gap-x-1 gap-y-1">
      <span>Reviewed by </span>
      <Link
        href={authorHref}
        className="inline-flex items-center gap-1.5 font-medium text-accent hover:text-accent-hover"
      >
        <AuthorAvatar
          initials={author.imageInitials}
          name={author.name}
          size="sm"
        />
        {author.name}
      </Link>
      <span> · Last reviewed {formattedReviewed}</span>
    </span>
  );
}
