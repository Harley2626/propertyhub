import {
  getGoogleAnalyticsId,
  isGoogleAnalyticsEnabled,
} from "@/lib/analytics/config";
import Script from "next/script";

/**
 * Injects the GA4 gtag.js snippet. Renders nothing when analytics is disabled
 * (development, preview builds, or missing measurement ID).
 */
export function GoogleAnalytics() {
  if (!isGoogleAnalyticsEnabled()) return null;

  const measurementId = getGoogleAnalyticsId();
  if (!measurementId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            send_page_view: false
          });
        `}
      </Script>
    </>
  );
}
