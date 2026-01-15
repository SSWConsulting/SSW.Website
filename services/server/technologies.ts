"use server";

import client from "../../tina/__generated__/client";

// /**
//  * Fetches technologies v2 data from TinaCMS filtered by technology group names
//  * @param technologyGroupNames Array of technology group names to filter by
//  * @returns The technologies v2 connection data
//  */
// export const getTechnologiesByGroup = async (
//   technologyGroupNames: string[]
// ) => {
//   const response = await client.queries.technologiesv2Connection({
//     filter: {
//       associatedGroup: {
//         technologyGroupsv2: {
//           name: {
//             in: technologyGroupNames,
//           },
//         },
//       },
//     },
//   });

//   return response;
// };

/**
 * Fetches technologies v2 data from TinaCMS filtered by technology names
 * @param technologyNames Array of technology names to filter by
 * @returns The technologies v2 connection data
 */
export const getTechnologiesByNames = async (technologyNames: string[]) => {
  const response = await client.queries.technologiesv2Connection({
    filter: {
      name: {
        in: technologyNames,
      },
    },
  });

  return response;
};

// /**
//  * Fetches individual technologies v2 data from TinaCMS by their references
//  * @param technologyReferences Array of technology reference paths (e.g., "content/technologiesv2/react.json")
//  * @returns Array of technology data
//  */
// export const getTechnologiesByReferences = async (
//   technologyReferences: string[]
// ) => {
//   const response = await client.queries.technologiesv2Connection({
//     filter: {

//     }
//   })
// };
