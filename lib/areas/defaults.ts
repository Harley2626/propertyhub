import type { CalculatorLink } from "./types";

/** Suggested calculators for area pages — override per area in content files. */
export const defaultAreaCalculatorLinks: CalculatorLink[] = [
  {
    href: "/tools/bond-calculator",
    label: "Bond Calculator",
    description: "Estimate monthly home loan repayments for this area.",
  },
  {
    href: "/tools/affordability-calculator",
    label: "Affordability Calculator",
    description: "See how much property you can afford based on income.",
  },
  {
    href: "/tools/rental-yield-calculator",
    label: "Rental Yield Calculator",
    description: "Calculate gross and net rental yield on investment property.",
  },
  {
    href: "/tools/transfer-duty-calculator",
    label: "Transfer Duty Calculator",
    description: "Estimate SARS transfer duty on your purchase price.",
  },
];
