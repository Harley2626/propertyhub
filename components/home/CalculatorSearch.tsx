"use client";

import type { Tool } from "@/lib/data/tools";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";

type CalculatorSearchProps = {
  tools: Tool[];
};

function matchesQuery(tool: Tool, query: string): boolean {
  const haystack =
    `${tool.title} ${tool.description} ${tool.slug}`.toLowerCase();
  return haystack.includes(query);
}

export function CalculatorSearch({ tools }: CalculatorSearchProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = "calculator-search-results";

  const normalizedQuery = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!normalizedQuery) return [];
    return tools.filter((tool) => matchesQuery(tool, normalizedQuery)).slice(0, 6);
  }, [tools, normalizedQuery]);

  const showResults = open && normalizedQuery.length > 0;

  return (
    <div className="relative mx-auto mt-10 w-full max-w-2xl animate-fade-in-up animation-delay-300">
      <label htmlFor="calculator-search" className="sr-only">
        Search calculators
      </label>
      <div className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted"
          aria-hidden
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          ref={inputRef}
          id="calculator-search"
          type="search"
          role="combobox"
          aria-expanded={showResults}
          aria-controls={showResults ? listId : undefined}
          aria-autocomplete="list"
          placeholder="Search calculators — bond, transfer duty, tax…"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => {
            window.setTimeout(() => setOpen(false), 150);
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setOpen(false);
              inputRef.current?.blur();
            }
          }}
          className="w-full rounded-2xl border border-border/80 bg-card py-4 pl-14 pr-5 text-base text-foreground shadow-xl shadow-accent/5 outline-none transition-all placeholder:text-muted/70 focus:border-accent/40 focus:ring-4 focus:ring-accent/10"
        />
      </div>

      {showResults ? (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-20 mt-2 max-h-80 w-full overflow-auto rounded-2xl border border-border bg-card py-2 shadow-2xl shadow-black/10"
        >
          {results.length > 0 ? (
            results.map((tool) => (
              <li key={tool.slug} role="option">
                <Link
                  href={tool.href}
                  className="flex flex-col gap-0.5 px-5 py-3 transition-colors hover:bg-muted-bg"
                  onMouseDown={(event) => event.preventDefault()}
                >
                  <span className="font-medium text-foreground">{tool.title}</span>
                  <span className="line-clamp-1 text-sm text-muted">
                    {tool.description}
                  </span>
                </Link>
              </li>
            ))
          ) : (
            <li className="px-5 py-4 text-sm text-muted">
              No calculators found. Try &ldquo;bond&rdquo;, &ldquo;VAT&rdquo;, or
              &ldquo;transfer duty&rdquo;.
            </li>
          )}
        </ul>
      ) : null}

      <p className="mt-4 text-center text-sm text-muted">
        Popular:{" "}
        {[
          { label: "Bond", href: "/tools/bond-calculator" },
          { label: "Transfer Duty", href: "/tools/transfer-duty-calculator" },
          { label: "Affordability", href: "/tools/affordability-calculator" },
        ].map((link, index) => (
          <span key={link.href}>
            {index > 0 ? " · " : null}
            <Link
              href={link.href}
              className="font-medium text-accent hover:text-accent-hover"
            >
              {link.label}
            </Link>
          </span>
        ))}
      </p>
    </div>
  );
}
