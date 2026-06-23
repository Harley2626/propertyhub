import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guides",
  description:
    "Property and finance guides for South Africans. Learn about bonds, transfer duty, buying your first home, and more.",
};

const guides = [
  {
    title: "First-Time Buyer's Guide to Property in South Africa",
    description:
      "Everything you need to know before purchasing your first home, from pre-approval to transfer.",
    href: "#",
    tag: "Property",
  },
  {
    title: "Understanding Transfer Duty in 2025",
    description:
      "How SARS transfer duty brackets work and what you'll pay on your property purchase.",
    href: "#",
    tag: "Tax",
  },
  {
    title: "How to Calculate Your Home Loan Affordability",
    description:
      "A step-by-step walkthrough of what banks look at when assessing your bond application.",
    href: "#",
    tag: "Finance",
  },
  {
    title: "Rent vs Buy: Which Is Right for You?",
    description:
      "Weigh the pros and cons of renting versus buying in the current South African market.",
    href: "#",
    tag: "Property",
  },
];

export default function GuidesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-muted">
          Guides
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Latest Guides
        </h1>
        <p className="mt-4 text-lg text-muted">
          Expert articles to help you navigate property and personal finance in
          South Africa.
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-5xl gap-6 sm:grid-cols-2">
        {guides.map((guide) => (
          <Link
            key={guide.title}
            href={guide.href}
            className="group flex flex-col rounded-2xl border border-border bg-card p-8 transition-all hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
          >
            <span className="inline-flex w-fit rounded-full bg-accent-light px-3 py-1 text-xs font-semibold text-accent">
              {guide.tag}
            </span>
            <h2 className="mt-4 text-xl font-semibold text-foreground group-hover:text-accent">
              {guide.title}
            </h2>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
              {guide.description}
            </p>
            <span className="mt-6 text-sm font-medium text-accent">
              Read guide &rarr;
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
