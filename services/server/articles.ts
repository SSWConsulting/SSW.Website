"use server";

import { GetArticlesQueryQuery } from "@/tina/types";
import client from "../../tina/__generated__/client";

/**
 * Fetches articles data from TinaCMS with pagination support
 * @param pageParam The cursor for pagination (after parameter)
 * @returns The articles query data
 */
export const getArticles = async ({
  pageParam,
}: {
  pageParam?: string;
}): Promise<GetArticlesQueryQuery> => {
  const res = await client.queries.getArticlesQuery({
    top: 10,
    after: pageParam,
  });

  return res.data;
};

