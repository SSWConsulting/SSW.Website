import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: '61fae421f078e9a93db10b1373494aceb93ccaa5', queries,  });
export default client;
  