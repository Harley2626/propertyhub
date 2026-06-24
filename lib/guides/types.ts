export type GuideTag = "Property" | "Finance" | "Tax";

export type GuideFAQ = {
  question: string;
  answer: string;
};

export type GuideSection = {
  id: string;
  title: string;
  paragraphs: string[];
};

export type GuideArticle = {
  slug: string;
  title: string;
  description: string;
  tag: GuideTag;
  readTime: string;
  publishedDate: string;
  updatedDate: string;
  relatedTool?: {
    slug: string;
    href: string;
    label: string;
  };
  additionalTools?: {
    href: string;
    label: string;
  }[];
  keywords?: string[];
  sections: GuideSection[];
  faqs: GuideFAQ[];
};

export type GuideSummary = Pick<
  GuideArticle,
  "slug" | "title" | "description" | "tag" | "readTime"
> & {
  href: string;
};
