import Link from "next/link";
import type { Tool } from "@/lib/data/tools";

type ToolCardProps = {
  tool: Tool;
};

export function ToolCard({ tool }: ToolCardProps) {
  return (
    <Link
      href={tool.href}
      className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:border-accent/30 hover:bg-card-hover hover:shadow-lg hover:shadow-accent/5"
    >
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent-light text-accent transition-colors group-hover:bg-accent group-hover:text-white">
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
      <h3 className="text-lg font-semibold text-foreground group-hover:text-accent">
        {tool.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
        {tool.description}
      </p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent opacity-0 transition-opacity group-hover:opacity-100">
        Open calculator
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
          aria-hidden
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </span>
    </Link>
  );
}
