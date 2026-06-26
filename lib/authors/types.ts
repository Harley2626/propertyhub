export type AuthorSlug = "jared-devlin";

export type AuthorProfile = {
  slug: AuthorSlug;
  name: string;
  title: string;
  role: string;
  location: string;
  bio: string;
  shortBio: string;
  missionStatement: string;
  editorialPrinciples: string[];
  researchFocus: string[];
  expertise: string[];
  /** Initials for profile photo placeholder until a photo is added. */
  imageInitials: string;
  lastUpdated: string;
  joinedDate: string;
};

export type AuthorSummary = Pick<
  AuthorProfile,
  "slug" | "name" | "title" | "role" | "location" | "shortBio" | "expertise" | "imageInitials" | "lastUpdated"
> & {
  href: string;
};
