import { Hero } from "@/components/home/Hero";
import { CategorySection } from "@/components/home/CategorySection";
import { FeaturedCalculators } from "@/components/home/FeaturedCalculators";
import { LatestGuides } from "@/components/home/LatestGuides";
import { WhyPropertyPilot } from "@/components/home/WhyPropertyPilot";
import { JsonLd } from "@/components/seo/JsonLd";
import { toolCategories } from "@/lib/data/tools";
import { siteConfig } from "@/lib/metadata";
import { buildSiteSchema } from "@/lib/seo/site-schema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: siteConfig.title,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.ogTitle,
    description: siteConfig.ogDescription,
    url: siteConfig.url,
  },
  twitter: {
    title: siteConfig.ogTitle,
    description: siteConfig.ogDescription,
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={buildSiteSchema()} />
      <Hero />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-24 py-20 sm:space-y-28 sm:py-28">
          <div id="featured-calculators">
            <FeaturedCalculators />
          </div>
          <WhyPropertyPilot />
          <LatestGuides />

          <div className="border-t border-border/60 pt-4">
            <p className="mb-16 text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              All calculators
            </p>
            <div className="space-y-24 sm:space-y-28">
              {toolCategories.map((category) => (
                <CategorySection key={category.id} category={category} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
