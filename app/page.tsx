import { Hero } from "@/components/home/Hero";
import { CategorySection } from "@/components/home/CategorySection";
import { toolCategories } from "@/lib/data/tools";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Property & Finance Tools for South Africans",
  description:
    "Free property and finance calculators for South Africa. Transfer duty, bond repayments, affordability, rental yield, tax tools, and expert guides.",
};

export default function HomePage() {
  return (
    <>
      <Hero />

      <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="space-y-20">
          {toolCategories.map((category) => (
            <CategorySection key={category.id} category={category} />
          ))}
        </div>
      </div>
    </>
  );
}
