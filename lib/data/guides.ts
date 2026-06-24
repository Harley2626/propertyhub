import type { GuideSummary } from "@/lib/guides/types";
import { getGuideSummaries } from "@/lib/guides/registry";

/** All published guides for homepage and /guides index. */
export function getAllGuideSummaries(): GuideSummary[] {
  return getGuideSummaries();
}

export type { GuideSummary as Guide };
