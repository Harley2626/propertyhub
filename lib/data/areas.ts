import {
  getCitySummaries,
  getLocationSummaries,
  getSuburbSummaries,
} from "@/lib/areas/registry";
import type { LocationSummary } from "@/lib/areas/types";

export function getAllLocationSummaries(): LocationSummary[] {
  return getLocationSummaries();
}

export function getAllAreaSummaries(): LocationSummary[] {
  return getCitySummaries();
}

export function getAllSuburbSummaries(): LocationSummary[] {
  return getSuburbSummaries();
}

export type { LocationSummary as Area, LocationSummary };
