import { NextRequest, NextResponse } from "next/server";
import { cache } from "../../../services/server/cacheService";
import { getYoutubePlaylist } from "../../../services/server/youtube";

const CACHE_HOURS = 6 * 60 * 60; // ~ 6 hours

export async function GET(request: NextRequest) {
  try {
    const playlistId = request.nextUrl.searchParams.get("getPlaylistId");
    const videosCount = request.nextUrl.searchParams.get("videosCount");
    if (!playlistId) {
      return NextResponse.json(
        { message: "Invalid PlaylistId" },
        { status: 400 }
      );
    }
    const cacheKey = `youtube-playlist-${playlistId}-${videosCount}`;

    if (!cache.has(cacheKey)) {
      const playlist = await getYoutubePlaylist(
        playlistId,
        parseInt(videosCount)
      );

      cache.set(cacheKey, playlist, CACHE_HOURS);
      return NextResponse.json(playlist, { status: 200 });
    } else {
      const cachedPlaylist = cache.get(cacheKey);
      return NextResponse.json(cachedPlaylist, { status: 200 });
    }
  } catch (error) {
    console.error("Error occurred:", error);
    return (
      NextResponse.json({ message: error.message }),
      { status: error.statusCode }
    );
  }
}

// Handle unsupported methods
export async function POST() {
  return NextResponse.json({ message: "Unsupported method" }, { status: 405 });
}

export async function PUT() {
  return NextResponse.json({ message: "Unsupported method" }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ message: "Unsupported method" }, { status: 405 });
}
