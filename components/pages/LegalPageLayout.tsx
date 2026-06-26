import type { ReactNode } from "react";

type LegalSectionProps = {
  id: string;
  title: string;
  children: ReactNode;
};

export function LegalSection({ id, title, children }: LegalSectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="scroll-mt-28 border-b border-border pb-10 last:border-b-0 last:pb-0"
    >
      <h2
        id={`${id}-heading`}
        className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
      >
        {title}
      </h2>
      <div className="prose-legal mt-4 space-y-4 text-muted">{children}</div>
    </section>
  );
}

type LegalPageLayoutProps = {
  lastUpdated: string;
  children: ReactNode;
};

export function LegalPageLayout({ lastUpdated, children }: LegalPageLayoutProps) {
  const formattedDate = new Intl.DateTimeFormat("en-ZA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(lastUpdated));

  return (
    <article className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm text-muted">Last updated: {formattedDate}</p>
        <div className="mt-10 space-y-10">{children}</div>
      </div>
    </article>
  );
}
