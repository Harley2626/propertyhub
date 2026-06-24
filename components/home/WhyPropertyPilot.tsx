import { SectionHeader } from "@/components/home/SectionHeader";
import { whyPropertyPilot } from "@/lib/data/homepage";
import { siteConfig } from "@/lib/metadata";

const icons = {
  flag: (
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
  ),
  shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  chart: (
    <>
      <path d="M3 3v18h18" />
      <path d="m19 9-5 5-4-4-3 3" />
    </>
  ),
  device: (
    <>
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </>
  ),
} as const;

export function WhyPropertyPilot() {
  return (
    <section
      aria-labelledby="why-propertypilot-heading"
      className="scroll-mt-24 rounded-3xl border border-border/60 bg-muted-bg/80 px-6 py-14 sm:px-10 sm:py-16 lg:px-14"
    >
      <SectionHeader
        id="why-propertypilot-heading"
        label={`Why ${siteConfig.name}`}
        title="Trusted tools for smarter property decisions"
        description="PropertyPilot is built specifically for the South African market — accurate, free, and ready when you need answers."
        align="center"
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {whyPropertyPilot.map((item, index) => (
          <article
            key={item.title}
            className="group animate-fade-in-up rounded-2xl border border-border/60 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/20 hover:shadow-lg hover:shadow-accent/5"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-light text-accent transition-colors group-hover:bg-accent group-hover:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
                aria-hidden
              >
                {icons[item.icon]}
              </svg>
            </div>
            <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
