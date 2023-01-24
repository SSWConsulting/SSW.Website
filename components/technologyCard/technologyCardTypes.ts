export type TechnologyCardProps = {
  index: number;
  name: string;
  techListLength: number;
  readMoreSlug?: string | null;
  thumbnail?: string | null;
  body?: any | null; // eslint-disable-line @typescript-eslint/no-explicit-any
};

export type TechnologyCardsProps = {
  techHeader: string;
  techCards: {
    name: string;
    readMoreSlug?: string | null;
    thumbnail?: string | null;
    body?: any | null; // eslint-disable-line @typescript-eslint/no-explicit-any
  }[];
};
