import client from "@/tina/client";
import { cache } from "react";

export const getMegamenu = cache(async () => {
  const data = await client.queries.megamenu({
    relativePath: "menu.json",
  });

  return data;
});
