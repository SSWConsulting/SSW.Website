"use server";

import client from "../../tina/__generated__/client";

/**
 * Fetches technologies v2 data from TinaCMS filtered by technology group names
 * @param technologyGroupNames Array of technology group names to filter by
 * @returns The technologies v2 connection data
 */
export const getTechnologiesByGroup = async (
  technologyGroupNames: string[]
) => {
  const response = await client.queries.technologiesv2Connection({
    filter: {
      associatedGroup: {
        technologyGroupsv2: {
          name: {
            in: technologyGroupNames,
          },
        },
      },
    },
  });

  return response;
};
