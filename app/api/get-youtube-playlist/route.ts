import { NextRequest } from "next/server";
import { cache } from "../../../services/server/cacheService";
import { getYoutubePlaylist } from "../../../services/server/youtube";

const CACHE_HOURS = 6 * 60 * 60; // ~ 6 hours

export async function GET(request: NextRequest) {
  try {
    const playlistId = request.nextUrl.searchParams.get("playlistId");
    const videosCount = request.nextUrl.searchParams.get("videosCount");
    if (!playlistId) {
      return Response.json({ message: "Invalid PlaylistId" }, { status: 400 });
    }
    const cacheKey = `youtube-playlist-${playlistId}-${videosCount}`;

    if (!cache.has(cacheKey)) {
      const playlist = await getYoutubePlaylist(
        playlistId,
        parseInt(videosCount)
      );
      cache.set(cacheKey, playlist, CACHE_HOURS);
      return Response.json(playlist, { status: 200 });
    } else {
      const cachedPlaylist = cache.get(cacheKey);
      return Response.json(cachedPlaylist, { status: 200 });
    }
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: error.message },
      { status: error.statusCode }
    );
  }
}

// Handle unsupported methods
export async function POST() {
  return Response.json({ message: "Unsupported method" }, { status: 405 });
}

export async function PUT() {
  return Response.json({ message: "Unsupported method" }, { status: 405 });
}

export async function DELETE() {
  return Response.json({ message: "Unsupported method" }, { status: 405 });
}
