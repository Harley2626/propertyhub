import { getAreaSummaries } from "@/lib/areas/registry";
import type { AreaSummary } from "@/lib/areas/types";

export function getAllAreaSummaries(): AreaSummary[] {
  return getAreaSummaries();
}

export type { AreaSummary as Area };
