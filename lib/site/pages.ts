/** Contact details shown on the Contact page and in legal documents. */
export const contactConfig = {
  email: "hello@thepropertypilot.co.za",
  location: "Cape Town, South Africa",
  businessHours: "Monday to Friday, 09:00 – 17:00 SAST",
  responseTime:
    "We aim to respond to enquiries within two business days.",
} as const;

/** Static marketing and legal pages included in the sitemap. */
export const staticSitePages = [
  { path: "/about", priority: 0.75, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.75, changeFrequency: "monthly" as const },
  { path: "/answers", priority: 0.88, changeFrequency: "weekly" as const },
  { path: "/methodology", priority: 0.65, changeFrequency: "monthly" as const },
  { path: "/sources", priority: 0.65, changeFrequency: "monthly" as const },
  { path: "/privacy-policy", priority: 0.5, changeFrequency: "yearly" as const },
  { path: "/terms", priority: 0.5, changeFrequency: "yearly" as const },
  { path: "/disclaimer", priority: 0.5, changeFrequency: "yearly" as const },
] as const;

export const legalLastUpdated = "2025-06-24";
