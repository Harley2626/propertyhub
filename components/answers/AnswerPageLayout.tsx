import { FAQSection } from "@/components/tools/FAQSection";
import { RelatedContentSection } from "@/components/knowledge/RelatedContentSection";
import { getToolBySlug } from "@/lib/data/tools";
import { getGuideBySlug } from "@/lib/guides/registry";
import { getAnswerBySlug } from "@/lib/answers/registry";
import type { AnswerArticle } from "@/lib/answers/types";
import Link from "next/link";

type AnswerPageLayoutProps = {
  answer: AnswerArticle;
};

function RelatedLinks({ answer }: AnswerPageLayoutProps) {
  const calculators = (answer.relatedCalculators ?? [])
    .map((slug) => getToolBySlug(slug)?.tool)
    .filter(Boolean);
  const guides = (answer.relatedGuides ?? [])
    .map((slug) => getGuideBySlug(slug))
    .filter(Boolean);
  const relatedAnswers = (answer.relatedAnswers ?? [])
    .map((slug) => getAnswerBySlug(slug))
    .filter(Boolean);

  if (!calculators.length && !guides.length && !relatedAnswers.length) {
    return null;
  }

  return (
    <section
      aria-labelledby="answer-related-heading"
      className="scroll-mt-28 rounded-2xl border border-border bg-card p-6 sm:p-8"
    >
      <h2
        id="answer-related-heading"
        className="text-xl font-semibold tracking-tight text-foreground"
      >
        Related resources
      </h2>
      <div className="mt-6 grid gap-8 sm:grid-cols-2">
        {calculators.length > 0 ? (
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Calculators
            </h3>
            <ul className="mt-4 space-y-3">
              {calculators.map((tool) => (
                <li key={tool!.slug}>
                  <Link
                    href={tool!.href}
                    className="font-medium text-accent hover:text-accent-hover"
                  >
                    {tool!.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        {guides.length > 0 ? (
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Guides
            </h3>
            <ul className="mt-4 space-y-3">
              {guides.map((guide) => (
                <li key={guide!.slug}>
                  <Link
                    href={`/guides/${guide!.slug}`}
                    className="font-medium text-accent hover:text-accent-hover"
                  >
                    {guide!.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        {relatedAnswers.length > 0 ? (
          <div className="sm:col-span-2">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Related answers
            </h3>
            <ul className="mt-4 flex flex-wrap gap-3">
              {relatedAnswers.map((item) => (
                <li key={item!.slug}>
                  <Link
                    href={`/answers/${item!.slug}`}
                    className="inline-flex rounded-full border border-border bg-muted-bg/50 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent/30 hover:text-accent"
                  >
                    {item!.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function AnswerPageLayout({ answer }: AnswerPageLayoutProps) {
  const formattedReviewed = new Intl.DateTimeFormat("en-ZA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(answer.lastReviewed));

  return (
    <article className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-3xl space-y-16">
        <section aria-labelledby="short-answer-heading">
          <h2
            id="short-answer-heading"
            className="text-sm font-semibold uppercase tracking-wider text-accent"
          >
            Short answer
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-foreground">
            {answer.shortAnswer}
          </p>
        </section>

        <section aria-labelledby="detailed-explanation-heading" className="scroll-mt-28">
          <h2
            id="detailed-explanation-heading"
            className="text-2xl font-bold tracking-tight text-foreground"
          >
            Detailed explanation
          </h2>
          <div className="prose-guide mt-6 space-y-4">
            {answer.detailedExplanation.map((paragraph, index) => (
              <p key={index} className="leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        <section aria-labelledby="things-to-know-heading" className="scroll-mt-28">
          <h2
            id="things-to-know-heading"
            className="text-2xl font-bold tracking-tight text-foreground"
          >
            Things to know
          </h2>
          <ul className="mt-6 list-inside list-disc space-y-2 text-muted">
            {answer.thingsToKnow.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="common-mistakes-heading" className="scroll-mt-28">
          <h2
            id="common-mistakes-heading"
            className="text-2xl font-bold tracking-tight text-foreground"
          >
            Common mistakes
          </h2>
          <ul className="mt-6 list-inside list-disc space-y-2 text-muted">
            {answer.commonMistakes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <RelatedLinks answer={answer} />

        {answer.officialSources.length > 0 ? (
          <section aria-labelledby="official-sources-heading" className="scroll-mt-28">
            <h2
              id="official-sources-heading"
              className="text-2xl font-bold tracking-tight text-foreground"
            >
              Official sources
            </h2>
            <ul className="mt-6 space-y-4">
              {answer.officialSources.map((source) => (
                <li key={source.url}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-accent hover:text-accent-hover"
                  >
                    {source.name}
                  </a>
                  {source.description ? (
                    <p className="mt-1 text-sm text-muted">{source.description}</p>
                  ) : null}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted">
              See our full{" "}
              <Link href="/sources" className="text-accent hover:text-accent-hover">
                sources directory
              </Link>{" "}
              and{" "}
              <Link href="/methodology" className="text-accent hover:text-accent-hover">
                editorial methodology
              </Link>
              .
            </p>
          </section>
        ) : null}

        <section
          aria-labelledby="review-metadata-heading"
          className="rounded-xl border border-border bg-muted-bg/50 p-6"
        >
          <h2 id="review-metadata-heading" className="sr-only">
            Review information
          </h2>
          <p className="text-sm text-muted">
            Last reviewed {formattedReviewed}
            {answer.reviewedBy ? ` by ${answer.reviewedBy}` : ""}. PropertyPilot
            answers are updated when SARS rates, regulations, or market
            conventions change.{" "}
            <Link href="/methodology" className="text-accent hover:text-accent-hover">
              Read our review policy
            </Link>
            .
          </p>
        </section>
      </div>

      {answer.faqs.length > 0 ? (
        <div className="mx-auto mt-16 max-w-3xl">
          <FAQSection faqs={answer.faqs} />
        </div>
      ) : null}

      <div className="mx-auto mt-16 max-w-3xl">
        <RelatedContentSection
          source={{ kind: "answer", slug: answer.slug }}
          showContinueLearning
        />
      </div>
    </article>
  );
}
