import type { FAQ } from "@/lib/data/tools";

type FAQSectionProps = {
  faqs: FAQ[];
};

export function FAQSection({ faqs }: FAQSectionProps) {
  return (
    <section aria-labelledby="faq-heading">
      <h2
        id="faq-heading"
        className="text-2xl font-bold tracking-tight text-foreground"
      >
        Frequently asked questions
      </h2>
      <div className="mt-6 divide-y divide-border rounded-2xl border border-border bg-card">
        {faqs.map((faq, index) => (
          <details key={index} className="group px-6 py-1">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left font-medium text-foreground marker:content-none [&::-webkit-details-marker]:hidden">
              {faq.question}
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted-bg text-muted transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="pb-4 text-sm leading-relaxed text-muted">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
