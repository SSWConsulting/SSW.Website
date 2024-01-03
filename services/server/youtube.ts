export type YoutubeVideoLinkType = {
  title: string;
  link: string;
};

export async function getYoutubePlaylist(
  playlistId: string,
  videosCount: number
): Promise<YoutubeVideoLinkType[]> {
  const url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=contentDetails&part=id&part=snippet&part=status&maxResults=100&playlistId=${playlistId}&key=${process.env.YOUTUBE_PRIVATE_KEY}`;
  const res = await fetch(url);
  const data = await res.json();

  if (data && data.items) {
    const playListVideosBaseUrl = "https://www.youtube.com/watch?v=";

    return data.items.slice(0, videosCount).map((item) => ({
      title: item.snippet.title,
      link: `${playListVideosBaseUrl}${item.snippet.resourceId.videoId}&list=${item.snippet.playlistId}`,
    }));
  }

  return [];
}
