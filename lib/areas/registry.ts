import { capeTownArea } from "./content/cape-town";
import { durbanArea } from "./content/durban";
import { johannesburgArea } from "./content/johannesburg";
import { pretoriaArea } from "./content/pretoria";
import type { AreaGuide, AreaSummary } from "./types";

export const areaGuides: AreaGuide[] = [
  capeTownArea,
  johannesburgArea,
  durbanArea,
  pretoriaArea,
];

export function getAreaBySlug(slug: string): AreaGuide | undefined {
  return areaGuides.find((area) => area.slug === slug);
}

export function getAreaSummaries(): AreaSummary[] {
  return areaGuides.map((area) => ({
    slug: area.slug,
    title: area.title,
    description: area.description,
    city: area.city,
    province: area.province,
    href: `/areas/${area.slug}`,
  }));
}
