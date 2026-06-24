import { getAllTools, type Tool } from "./tools";

export const FEATURED_CALCULATOR_SLUGS = [
  "transfer-duty-calculator",
  "bond-calculator",
  "affordability-calculator",
  "income-tax-calculator",
] as const;

export const whyPropertyPilot = [
  {
    title: "Built for South Africa",
    description:
      "SARS transfer duty brackets, 2026/2027 tax tables, 15% VAT, and ZAR formatting — not generic international defaults.",
    icon: "flag" as const,
  },
  {
    title: "Free, always",
    description:
      "Every calculator is free to use with no sign-up, no subscriptions, and no hidden limits.",
    icon: "shield" as const,
  },
  {
    title: "Accurate formulas",
    description:
      "Bank-standard amortization, compound interest, and tax calculations validated against official sources.",
    icon: "chart" as const,
  },
  {
    title: "Works everywhere",
    description:
      "Fast, mobile-first tools that load instantly on any phone, tablet, or desktop browser.",
    icon: "device" as const,
  },
] as const;

export function getFeaturedTools(): Tool[] {
  const all = getAllTools();
  return FEATURED_CALCULATOR_SLUGS.map((slug) =>
    all.find((tool) => tool.slug === slug),
  ).filter((tool): tool is Tool => tool !== undefined);
}
