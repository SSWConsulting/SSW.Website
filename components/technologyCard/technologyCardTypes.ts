export type TechnologyCardProps = {
  name: string;
  readMoreSlug?: string | null;
  thumbnail?: string | null;
  body?: any | null; // eslint-disable-line @typescript-eslint/no-explicit-any
};

export type TechnologyCardsProps = {
  header: string | null;
  subheading?: string | null;
  technologyCards: {
    technologyCard: TechnologyCardProps;
  }[];
};
