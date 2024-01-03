export type VideoLink = {
  title: string;
  link: string;
};

const defaultVideoCount = 6;

export async function getYoutubePlaylist(
  playlistId: string,
  videosCount: number
): Promise<VideoLink[]> {
  const url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=contentDetails&part=id&part=snippet&part=status&maxResults=${
    videosCount || defaultVideoCount
  }&playlistId=${playlistId}&key=${process.env.YOUTUBE_PRIVATE_KEY}`;
  const res = await fetch(url);
  const data = await res.json();

  if (data && data.items) {
    const playListVideosBaseUrl = "https://www.youtube.com/watch?v=";

    return data.items.map((item) => ({
      title: item.snippet.title,
      link: `${playListVideosBaseUrl}${item.snippet.resourceId.videoId}&list=${item.snippet.playlistId}`,
    }));
  }

  return [];
}
