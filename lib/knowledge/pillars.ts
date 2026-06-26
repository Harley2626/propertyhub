import type { ContentPillar, ContentPillarSlug } from "./types";

export const contentPillars: ContentPillar[] = [
  {
    slug: "buying-property",
    name: "Buying Property",
    description:
      "Guides and tools for purchasing property in South Africa — deposits, bonds, transfer duty, and the full transfer process.",
    hubDescription:
      "Everything you need to buy property in South Africa: first-time buyer guides, transfer costs, conveyancing, and practical checklists.",
    featuredGuideSlug: "first-time-home-buyer-guide-south-africa",
    subtopics: {
      deposits: "Deposits",
      conveyancing: "Conveyancing",
      "first-time-buyers": "First Time Buyers",
      "bond-applications": "Bond Applications",
      "transfer-duty": "Transfer Duty",
      "offer-to-purchase": "Offer to Purchase",
    },
  },
  {
    slug: "property-finance",
    name: "Property Finance",
    description:
      "Home loans, affordability, interest rates, and bond repayment strategies for South African buyers.",
    hubDescription:
      "Understand bonds, affordability, repo and prime rates, and how to model repayments before you apply.",
    featuredGuideSlug: "how-much-house-can-i-afford-south-africa",
    subtopics: {
      "interest-rates": "Interest Rates",
      bonds: "Bonds",
      affordability: "Affordability",
      refinancing: "Refinancing",
      "bond-repayment": "Bond Repayment",
    },
  },
  {
    slug: "property-investment",
    name: "Property Investment",
    description:
      "Rental yield, buy-to-let, rent vs buy, and investment analysis for South African property.",
    hubDescription:
      "Compare renting and buying, model rental yield, and build investment literacy without sales pressure.",
    featuredGuideSlug: "rent-vs-buy-south-africa-2025",
    subtopics: {
      "rent-vs-buy": "Rent vs Buy",
      "rental-yield": "Rental Yield",
      "buy-to-let": "Buy to Let",
      "capital-gains": "Capital Gains",
    },
  },
  {
    slug: "areas-and-suburbs",
    name: "Areas & Suburbs",
    description:
      "City and suburb property guides covering major South African metros and popular buyer locations.",
    hubDescription:
      "Explore metro overviews and in-depth suburb guides — neighbourhoods, property types, and local buyer context.",
    subtopics: {
      cities: "Cities",
      suburbs: "Suburbs",
      "western-cape": "Western Cape",
      gauteng: "Gauteng",
      "kwazulu-natal": "KwaZulu-Natal",
    },
  },
  {
    slug: "property-data",
    name: "Property Data",
    description:
      "Market context, price trends, and data-driven property insights for South Africa.",
    hubDescription:
      "Indicative market context and data guides. Proprietary trend data is planned — we prioritise accuracy over volume.",
    subtopics: {
      "price-trends": "Price Trends",
      "rental-market": "Rental Market",
      "market-activity": "Market Activity",
    },
  },
  {
    slug: "calculators",
    name: "Calculators",
    description:
      "Free property and finance calculators built for South African rules, tax bands, and lending conventions.",
    hubDescription:
      "Transfer duty, bond repayments, affordability, rental yield, and more — free tools with no sign-up required.",
    subtopics: {
      property: "Property",
      finance: "Finance",
      tax: "Tax",
    },
  },
];

const pillarBySlug = new Map(contentPillars.map((p) => [p.slug, p]));

export function getPillarBySlug(slug: string): ContentPillar | undefined {
  return pillarBySlug.get(slug as ContentPillarSlug);
}

export function isPillarSlug(slug: string): slug is ContentPillarSlug {
  return pillarBySlug.has(slug as ContentPillarSlug);
}

export function getPillarHubPath(slug: ContentPillarSlug): string {
  return `/guides/${slug}`;
}

export function getPillarName(slug: ContentPillarSlug): string {
  return pillarBySlug.get(slug)?.name ?? slug;
}

export function getSubtopicLabel(
  pillar: ContentPillarSlug,
  subtopic?: string,
): string | undefined {
  if (!subtopic) return undefined;
  return pillarBySlug.get(pillar)?.subtopics[subtopic] ?? subtopic;
}
