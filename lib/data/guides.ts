export type Guide = {
  title: string;
  description: string;
  href: string;
  tag: "Property" | "Finance" | "Tax";
  readTime: string;
};

export const guides: Guide[] = [
  {
    title: "First-Time Buyer's Guide to Property in South Africa",
    description:
      "Everything you need to know before purchasing your first home, from pre-approval to transfer.",
    href: "#",
    tag: "Property",
    readTime: "8 min read",
  },
  {
    title: "Understanding Transfer Duty in 2025",
    description:
      "How SARS transfer duty brackets work and what you'll pay on your property purchase.",
    href: "#",
    tag: "Tax",
    readTime: "6 min read",
  },
  {
    title: "How to Calculate Your Home Loan Affordability",
    description:
      "A step-by-step walkthrough of what banks look at when assessing your bond application.",
    href: "#",
    tag: "Finance",
    readTime: "5 min read",
  },
  {
    title: "Rent vs Buy: Which Is Right for You?",
    description:
      "Weigh the pros and cons of renting versus buying in the current South African market.",
    href: "#",
    tag: "Property",
    readTime: "7 min read",
  },
];
