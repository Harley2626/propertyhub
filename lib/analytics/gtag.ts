import { getGoogleAnalyticsId, isGoogleAnalyticsEnabled } from "./config";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

function canTrack(): boolean {
  return (
    typeof window !== "undefined" &&
    isGoogleAnalyticsEnabled() &&
    typeof window.gtag === "function"
  );
}

/** Send a GA4 page_view for client-side navigations. */
export function trackPageView(url: string): void {
  if (!canTrack()) return;

  const measurementId = getGoogleAnalyticsId();
  if (!measurementId) return;

  window.gtag!("config", measurementId, {
    page_path: url,
  });
}

/** Send a custom GA4 event. No-ops outside production. */
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>,
): void {
  if (!canTrack()) return;
  window.gtag!("event", eventName, params);
}
