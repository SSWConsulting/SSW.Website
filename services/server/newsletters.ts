"use server";

import client from "../../tina/__generated__/client";

/**
 * Fetches newsletters data from TinaCMS
 * @returns The newsletters connection data
 */
export const getNewsletters = async () => {
  const data = await client.queries.newslettersConnection();
  return data;
};
