import { CalculatorSearch } from "@/components/home/CalculatorSearch";
import { Button } from "@/components/ui/Button";
import { getAllTools } from "@/lib/data/tools";
import { siteConfig } from "@/lib/metadata";

export function Hero() {
  const tools = getAllTools();

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden border-b border-border/60"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="hero-gradient absolute inset-0" />
        <div className="absolute -left-32 top-0 h-[480px] w-[480px] rounded-full bg-accent/[0.07] blur-3xl" />
        <div className="absolute -right-24 top-20 h-96 w-96 rounded-full bg-sky-400/[0.06] blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-px w-full max-w-4xl -translate-x-1/2 bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-4xl text-center">
          <div className="animate-fade-in-up inline-flex items-center gap-2.5 rounded-full border border-border/80 bg-card/80 px-4 py-2 text-sm font-medium text-muted shadow-sm backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Built for South Africa · Updated for 2025/2026 tax &amp; duty rates
          </div>

          <h1
            id="hero-heading"
            className="animate-fade-in-up animation-delay-100 mt-10 text-[2.5rem] font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-[3.5rem]"
          >
            {siteConfig.tagline.split(" for ")[0]} for{" "}
            <span className="bg-gradient-to-r from-accent to-sky-500 bg-clip-text text-transparent">
              South Africans
            </span>
          </h1>

          <p className="animate-fade-in-up animation-delay-200 mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl sm:leading-relaxed">
            {siteConfig.description}
          </p>

          <CalculatorSearch tools={tools} />

          <div className="animate-fade-in-up animation-delay-400 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="/#featured-calculators" className="min-w-[180px]">
              Explore calculators
            </Button>
            <Button href="/guides" variant="secondary" className="min-w-[180px]">
              Read guides
            </Button>
          </div>

          <dl className="animate-fade-in-up animation-delay-500 mt-20 grid grid-cols-2 gap-8 border-t border-border/60 pt-12 sm:grid-cols-4">
            {[
              { value: "13+", label: "Free calculators" },
              { value: "SARS", label: "Official tax & duty rates" },
              { value: "100%", label: "Free to use" },
              { value: "ZA", label: "Built for SA" },
            ].map((stat) => (
              <div key={stat.label} className="text-center sm:text-left">
                <dt className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  {stat.value}
                </dt>
                <dd className="mt-1.5 text-xs font-medium text-muted sm:text-sm">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
