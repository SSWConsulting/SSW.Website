import { NextApiRequest, NextApiResponse } from "next";

import { getYoutubePlaylist } from "../../services/server/youtube";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const playlistId: string = req.query.playlistId;
      const videoCount: number = req.query.videosCount;
      const videos = await getYoutubePlaylist(playlistId, videoCount);
      res.status(200).send(videos);
    } catch (error) {
      res.status(error.statusCode).json({ message: error.message });
    }
  } else {
    res.status(405).json({ message: "Unsupported method" });
  }
}
