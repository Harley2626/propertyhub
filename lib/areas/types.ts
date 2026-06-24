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

export type AreaGuide = {
  slug: string;
  title: string;
  description: string;
  city: string;
  province: string;
  publishedDate: string;
  updatedDate: string;
  keywords?: string[];
  averagePrices: PropertyPriceRange[];
  popularSuburbs: PopularSuburb[];
  prosAndCons: ProsAndCons;
  marketOverview: string[];
  propertyInvestment: string[];
  rentalYield: string[];
  calculatorLinks: CalculatorLink[];
  faqs: AreaFAQ[];
};

export type AreaSummary = Pick<
  AreaGuide,
  "slug" | "title" | "description" | "city" | "province"
> & {
  href: string;
};
