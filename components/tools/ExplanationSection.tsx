type ExplanationSectionProps = {
  title: string;
  paragraphs: string[];
};

export function ExplanationSection({
  title,
  paragraphs,
}: ExplanationSectionProps) {
  return (
    <section aria-labelledby="explanation-heading">
      <h2
        id="explanation-heading"
        className="text-2xl font-bold tracking-tight text-foreground"
      >
        {title}
      </h2>
      <div className="mt-6 space-y-4">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="leading-relaxed text-muted">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
