import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute top-32 right-0 h-64 w-64 rounded-full bg-blue-400/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-muted">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Free tools for South African property buyers
          </span>

          <h1 className="mt-8 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Property &amp; Finance Tools for{" "}
            <span className="text-accent">South Africans</span>
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-muted sm:text-xl">
            Free calculators and guides to help you make smarter property
            decisions.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="/#property-tools">Explore Tools</Button>
            <Button href="/guides" variant="secondary">
              Latest Guides
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-6 border-t border-border pt-10">
            {[
              { value: "13+", label: "Free calculators" },
              { value: "100%", label: "Free to use" },
              { value: "ZA", label: "Built for SA" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-accent sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-muted sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
