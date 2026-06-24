/**
 * Google Analytics 4 configuration.
 *
 * Set the measurement ID in `.env.production` (or your host's env vars):
 *
 *   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
 *
 * Analytics loads only when NODE_ENV is "production" and a valid ID is set.
 * Leave unset or use the placeholder during development — no scripts are injected.
 */
export const GA_MEASUREMENT_ID_ENV = "NEXT_PUBLIC_GA_MEASUREMENT_ID";

const PLACEHOLDER_IDS = new Set(["", "G-XXXXXXXXXX", "G-PLACEHOLDER"]);

/** Returns the GA4 measurement ID, or undefined if not configured. */
export function getGoogleAnalyticsId(): string | undefined {
  const id = process.env[GA_MEASUREMENT_ID_ENV]?.trim();
  if (!id || PLACEHOLDER_IDS.has(id)) return undefined;
  return id;
}

/** True when GA4 scripts should be injected (production + valid ID). */
export function isGoogleAnalyticsEnabled(): boolean {
  return process.env.NODE_ENV === "production" && Boolean(getGoogleAnalyticsId());
}
