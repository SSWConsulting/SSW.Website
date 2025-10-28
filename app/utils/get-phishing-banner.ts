import { cache } from "react";
import client from "../../tina/__generated__/client";

export const getPhishingBanner = cache(async () => {
  try {
    const data = await client.queries.phishingBanner({
      relativePath: "banner.json",
    });
    return data;
  } catch (error) {
    return null;
  }
});

export type PhishingBannerProps = Awaited<
  ReturnType<typeof client.queries.phishingBanner>
>;
