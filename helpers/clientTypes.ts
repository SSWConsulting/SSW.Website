import type { TinaMarkdownContent } from "tinacms/dist/rich-text";

export type Category = {
  id: string;
  name: string;
};

export type ClientDisplay = {
  name: string;
  logo?: string;
  logoUrl?: string;
  content: TinaMarkdownContent;
  caseStudyUrl?: string;
  headline?: string;
  summary?: string;
  service?: string;
  image?: string;
  featured?: boolean;
  categories: {
    category: Category;
  }[];
};

export const CLIENT_SERVICES = [
  "AI development",
  "Business applications",
  "Cloud & DevOps",
  "Mobile development",
  "Web development",
];
