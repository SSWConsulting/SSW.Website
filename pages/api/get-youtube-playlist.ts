import { NextApiRequest, NextApiResponse } from "next";

import { cache } from "../../services/server/cacheService";
const CACHE_HOURS = 6 * 60 * 60; // ~ 6 hours

import { getYoutubePlaylist } from "../../services/server/youtube";

type NextApiRequestWithParams = NextApiRequest & {
  query: {
    playlistId: string;
    videosCount: number;
  };
};

export default async function handler(
  req: NextApiRequestWithParams,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Unsupported method" });
    return;
  }

  try {
    const { playlistId, videosCount } = req.query;

    if (!playlistId) {
      return res.status(400).json({ message: "Invalid PlaylistId" });
    }
    const cacheKey = `youtube-playlist-${playlistId}-${videosCount}`;

    if (!cache.has(cacheKey)) {
      const playlist = await getYoutubePlaylist(playlistId, videosCount);
      cache.set(cacheKey, playlist, CACHE_HOURS);
      res.status(200).send(playlist);
    } else {
      const cachedPlaylist = cache.get(playlistId);
      res.status(200).send(cachedPlaylist);
    }
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(error.statusCode).json({ message: error.message });
  }
}
