import type { CalculatorLink, RelatedGuideLink } from "./types";

export const AREA_PRICE_DISCLAIMER =
  "Property prices and rental yields are indicative only and should be verified using current listings and professional advice.";

export const AREA_ADVICE_DISCLAIMER =
  "This article is informational only and not financial advice.";

/** Standard calculator links for area pages. */
export const defaultAreaCalculatorLinks: CalculatorLink[] = [
  {
    href: "/tools/bond-calculator",
    label: "Bond Calculator",
    description: "Estimate monthly home loan repayments.",
  },
  {
    href: "/tools/affordability-calculator",
    label: "Affordability Calculator",
    description: "Estimate how much you may afford based on income.",
  },
  {
    href: "/tools/rental-yield-calculator",
    label: "Rental Yield Calculator",
    description: "Model gross and net rental yield.",
  },
  {
    href: "/tools/transfer-duty-calculator",
    label: "Transfer Duty Calculator",
    description: "Estimate SARS transfer duty on a purchase price.",
  },
  {
    href: "/tools/rent-vs-buy-calculator",
    label: "Rent vs Buy Calculator",
    description: "Compare renting versus buying over time.",
  },
];

/** Standard related guides linked from every area page. */
export const defaultRelatedGuides: RelatedGuideLink[] = [
  {
    href: "/guides/bond-calculator-south-africa-2025",
    label: "Bond Calculator South Africa (2025 Guide)",
  },
  {
    href: "/guides/transfer-duty-calculator-south-africa-2025",
    label: "Transfer Duty Calculator South Africa (2025 Guide)",
  },
  {
    href: "/guides/how-much-house-can-i-afford-south-africa",
    label: "How Much House Can I Afford? (South Africa)",
  },
  {
    href: "/guides/first-time-home-buyer-guide-south-africa",
    label: "First-Time Home Buyer Guide South Africa",
  },
  {
    href: "/guides/rent-vs-buy-south-africa-2025",
    label: "Rent vs Buy in South Africa (2025 Guide)",
  },
];
