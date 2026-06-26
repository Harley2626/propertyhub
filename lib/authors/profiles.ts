import type { AuthorProfile, AuthorSummary } from "./types";

export const jaredDevlin: AuthorProfile = {
  slug: "jared-devlin",
  name: "Jared Devlin",
  title: "Founder, PropertyPilot",
  role: "Editor-in-Chief",
  location: "Cape Town, South Africa",
  bio:
    "Jared Devlin founded PropertyPilot to give South Africans clear, independent property and finance research — without estate-agent spin or product sales. He leads editorial standards, calculator validation, and the publication's knowledge hub covering transfer duty, bonds, affordability, and home buying.",
  shortBio:
    "Founder of PropertyPilot. Independent property and finance research for South African buyers and investors.",
  missionStatement:
    "PropertyPilot exists to make South African property decisions clearer. We publish accurate calculators, concise answers, and practical guides so buyers can model costs, compare options, and understand the rules — without paying for tools or sitting through a sales pitch.",
  editorialPrinciples: [
    "Independence — no property sales, bond origination, or commission-driven recommendations.",
    "Accuracy — figures verified against SARS, SARB, and official sources before publication.",
    "Clarity — plain language written for South Africans, not generic international audiences.",
    "Transparency — assumptions, limitations, and review dates visible on every article.",
    "No valuations — we explain rules and costs; we do not publish automated property valuations.",
  ],
  researchFocus: [
    "South African property",
    "Property finance",
    "Home buying",
    "Property calculators",
  ],
  expertise: [
    "Transfer duty & property tax",
    "Home loan affordability",
    "Bond repayment modelling",
    "First-time buyer education",
    "Property investment basics",
    "South African regulatory research",
  ],
  imageInitials: "JD",
  lastUpdated: "2025-06-24",
  joinedDate: "2025-01-01",
};

const authors: AuthorProfile[] = [jaredDevlin];

export function getAuthorBySlug(slug: string): AuthorProfile | undefined {
  return authors.find((author) => author.slug === slug);
}

export function getDefaultAuthor(): AuthorProfile {
  return jaredDevlin;
}

export function getAuthorSummaries(): AuthorSummary[] {
  return authors.map((author) => ({
    slug: author.slug,
    name: author.name,
    title: author.title,
    role: author.role,
    location: author.location,
    shortBio: author.shortBio,
    expertise: author.expertise,
    imageInitials: author.imageInitials,
    lastUpdated: author.lastUpdated,
    href: `/authors/${author.slug}`,
  }));
}

export function buildAuthorPageUrl(slug: string): string {
  return `/authors/${slug}`;
}
