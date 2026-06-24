import type { GuideSummary } from "@/lib/guides/types";
import { getGuideSummaries } from "@/lib/guides/registry";

/** Listing cards for homepage and /guides index. */
export const placeholderGuides: GuideSummary[] = [
  {
    slug: "first-time-buyer-guide",
    title: "First-Time Buyer's Guide to Property in South Africa",
    description:
      "Everything you need to know before purchasing your first home, from pre-approval to transfer.",
    href: "#",
    tag: "Property",
    readTime: "8 min read",
  },
  {
    slug: "understanding-transfer-duty-2025",
    title: "Understanding Transfer Duty in 2025",
    description:
      "How SARS transfer duty brackets work and what you'll pay on your property purchase.",
    href: "#",
    tag: "Tax",
    readTime: "6 min read",
  },
  {
    slug: "home-loan-affordability",
    title: "How to Calculate Your Home Loan Affordability",
    description:
      "A step-by-step walkthrough of what banks look at when assessing your bond application.",
    href: "#",
    tag: "Finance",
    readTime: "5 min read",
  },
  {
    slug: "rent-vs-buy",
    title: "Rent vs Buy: Which Is Right for You?",
    description:
      "Weigh the pros and cons of renting versus buying in the current South African market.",
    href: "#",
    tag: "Property",
    readTime: "7 min read",
  },
];

/** Published guides plus placeholders for upcoming articles. */
export function getAllGuideSummaries(): GuideSummary[] {
  return [...getGuideSummaries(), ...placeholderGuides];
}

export type { GuideSummary as Guide };
