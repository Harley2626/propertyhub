import { bloubergArea } from "./content/blouberg";
import { capeTownArea } from "./content/cape-town";
import { durbanArea } from "./content/durban";
import { durbanvilleArea } from "./content/durbanville";
import { johannesburgArea } from "./content/johannesburg";
import { pretoriaArea } from "./content/pretoria";
import { seaPointArea } from "./content/sea-point";
import { somersetWestArea } from "./content/somerset-west";
import type { CityAreaGuide, LocationGuide, LocationSummary } from "./types";

export const cityGuides: CityAreaGuide[] = [
  capeTownArea,
  johannesburgArea,
  durbanArea,
  pretoriaArea,
];

export const suburbGuides = [
  somersetWestArea,
  durbanvilleArea,
  bloubergArea,
  seaPointArea,
] as const;

export const locationGuides: LocationGuide[] = [
  ...cityGuides,
  ...suburbGuides,
];

/** @deprecated Use locationGuides */
export const areaGuides = cityGuides;

export function getLocationBySlug(slug: string): LocationGuide | undefined {
  return locationGuides.find((guide) => guide.slug === slug);
}

/** @deprecated Use getLocationBySlug */
export function getAreaBySlug(slug: string): CityAreaGuide | undefined {
  const guide = getLocationBySlug(slug);
  return guide?.kind === "city" ? guide : undefined;
}

export function getCityBySlug(slug: string): CityAreaGuide | undefined {
  return cityGuides.find((city) => city.slug === slug);
}

export function getSuburbBySlug(slug: string) {
  return suburbGuides.find((suburb) => suburb.slug === slug);
}

function toSummary(guide: LocationGuide): LocationSummary {
  return {
    slug: guide.slug,
    title: guide.title,
    description: guide.description,
    city: guide.city,
    province: guide.province,
    kind: guide.kind,
    suburb: guide.kind === "suburb" ? guide.suburb : undefined,
    href: `/areas/${guide.slug}`,
  };
}

export function getLocationSummaries(): LocationSummary[] {
  return locationGuides.map(toSummary);
}

export function getCitySummaries(): LocationSummary[] {
  return cityGuides.map(toSummary);
}

export function getSuburbSummaries(): LocationSummary[] {
  return suburbGuides.map(toSummary);
}

/** @deprecated Use getLocationSummaries */
export function getAreaSummaries(): LocationSummary[] {
  return getCitySummaries();
}
