export type TechnologyCardProps = {
  index: number;
  name: string;
  techListLength: number;
  readMoreSlug?: string | null;
  thumbnail?: string | null;
  body?: any | null;
};

export type TechnologyCardsProps = {
  techHeader: string;
  techCards: {
    name: string;
    readMoreSlug?: string | null;
    thumbnail?: string | null;
    body?: any | null;
  }[];
};
