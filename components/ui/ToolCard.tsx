import Link from "next/link";
import type { Tool } from "@/lib/data/tools";

type ToolCardProps = {
  tool: Tool;
  featured?: boolean;
  category?: string;
};

export function ToolCard({ tool, featured = false, category }: ToolCardProps) {
  return (
    <Link
      href={tool.href}
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/25 hover:shadow-xl hover:shadow-accent/[0.07] ${
        featured ? "p-7" : "p-6"
      }`}
    >
      {featured ? (
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent to-sky-400 opacity-0 transition-opacity group-hover:opacity-100"
          aria-hidden
        />
      ) : null}

      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-light text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
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
            <rect width="16" height="20" x="4" y="2" rx="2" />
            <line x1="8" x2="16" y1="6" y2="6" />
            <line x1="8" x2="16" y1="10" y2="10" />
            <line x1="8" x2="12" y1="14" y2="14" />
          </svg>
        </div>
        {category ? (
          <span className="rounded-full bg-muted-bg px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted">
            {category}
          </span>
        ) : null}
      </div>

      <h3
        className={`font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent ${
          featured ? "text-lg" : "text-lg"
        }`}
      >
        {tool.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
        {tool.description}
      </p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
        Open calculator
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </span>
    </Link>
  );
}
