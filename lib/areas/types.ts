export type AreaFAQ = {
  question: string;
  answer: string;
};

export type PropertyPriceRange = {
  label: string;
  range: string;
  note?: string;
};

export type PopularSuburb = {
  name: string;
  description: string;
};

export type ProsAndCons = {
  pros: string[];
  cons: string[];
};

export type CalculatorLink = {
  href: string;
  label: string;
  description: string;
};

export type RelatedGuideLink = {
  href: string;
  label: string;
};

export type AreaGuide = {
  slug: string;
  title: string;
  description: string;
  city: string;
  province: string;
  publishedDate: string;
  updatedDate: string;
  lastReviewed: string;
  keywords?: string[];
  averagePrices: PropertyPriceRange[];
  popularSuburbs: PopularSuburb[];
  prosAndCons: ProsAndCons;
  /** Local market structure and buyer context — not investment tactics. */
  marketOverview: string[];
  /** Investor-focused strategies, property types, and risks. */
  propertyInvestment: string[];
  /** Yield mechanics, costs, and tenant matching for this metro. */
  rentalYield: string[];
  calculatorLinks?: CalculatorLink[];
  relatedGuides?: RelatedGuideLink[];
  faqs: AreaFAQ[];
};

export type AreaSummary = Pick<
  AreaGuide,
  "slug" | "title" | "description" | "city" | "province"
> & {
  href: string;
};
