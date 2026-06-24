export type AreaFAQ = {
  question: string;
  answer: string;
};

export type PropertyPriceRange = {
  label: string;
  range: string;
  note?: string;
};

export type Neighbourhood = {
  name: string;
  description: string;
};

export type PopularSuburb = Neighbourhood & {
  guideSlug?: string;
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

export type ResourceLink = {
  href: string;
  label: string;
  description?: string;
};

/** City-level metro guide (e.g. Cape Town, Johannesburg). */
export type CityAreaGuide = {
  kind: "city";
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
  marketOverview: string[];
  propertyInvestment: string[];
  rentalYield: string[];
  calculatorLinks?: CalculatorLink[];
  relatedGuides?: RelatedGuideLink[];
  faqs: AreaFAQ[];
};

/** Suburb-level premium guide (e.g. Sea Point, Durbanville). */
export type SuburbGuide = {
  kind: "suburb";
  slug: string;
  title: string;
  description: string;
  suburb: string;
  city: string;
  province: string;
  parentAreaSlug: string;
  publishedDate: string;
  updatedDate: string;
  lastReviewed: string;
  keywords?: string[];
  indicativePrices?: PropertyPriceRange[];
  overview: string[];
  whyBuyHere: string[];
  neighbourhoods: Neighbourhood[];
  propertyTypes: string[];
  lifestyleAmenities: string[];
  investmentPotential: string[];
  rentalMarket: string[];
  prosAndCons: ProsAndCons;
  bestSuitedFor: string[];
  relatedResources?: ResourceLink[];
  faqs: AreaFAQ[];
};

export type LocationGuide = CityAreaGuide | SuburbGuide;

export type LocationSummary = {
  slug: string;
  title: string;
  description: string;
  city: string;
  province: string;
  kind: "city" | "suburb";
  suburb?: string;
  href: string;
};

/** @deprecated Use CityAreaGuide */
export type AreaGuide = CityAreaGuide;

/** @deprecated Use LocationSummary */
export type AreaSummary = LocationSummary;

export function isSuburbGuide(guide: LocationGuide): guide is SuburbGuide {
  return guide.kind === "suburb";
}

export function isCityGuide(guide: LocationGuide): guide is CityAreaGuide {
  return guide.kind === "city";
}
