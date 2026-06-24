type SectionHeaderProps = {
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  id?: string;
};

export function SectionHeader({
  label,
  title,
  description,
  align = "left",
  id,
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <div
      className={`mb-10 sm:mb-12 ${isCenter ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}`}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
        {label}
      </p>
      <h2
        id={id}
        className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
