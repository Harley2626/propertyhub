import { defaultAreaCalculatorLinks } from "../defaults";
import type { AreaGuide } from "../types";

/**
 * Copy this file when adding a new city guide.
 * Register the export in lib/areas/registry.ts.
 */
export const exampleAreaTemplate: AreaGuide = {
  slug: "city-slug",
  title: "Buying Property in City Name",
  description: "Short meta description for SEO.",
  city: "City Name",
  province: "Province",
  publishedDate: "2025-01-01",
  updatedDate: "2025-01-01",
  lastReviewed: "2025-01-01",
  keywords: ["city property", "city property prices south africa"],
  averagePrices: [
    { label: "Entry-level apartment", range: "R0 – R0" },
    { label: "Family home", range: "R0 – R0" },
  ],
  popularSuburbs: [
    { name: "Suburb Name", description: "Brief suburb overview." },
  ],
  prosAndCons: {
    pros: ["Advantage one"],
    cons: ["Challenge one"],
  },
  marketOverview: ["Market structure and buyer context — not investment tactics."],
  propertyInvestment: ["Investor strategies and risks specific to this metro."],
  rentalYield: ["Yield mechanics, costs, and tenant matching."],
  calculatorLinks: defaultAreaCalculatorLinks,
  faqs: [
    {
      question: "Example question?",
      answer: "Example answer with link to a related guide where helpful.",
    },
  ],
};
