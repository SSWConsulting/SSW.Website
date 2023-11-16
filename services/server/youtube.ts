export async function getYoutubePlaylist(playlistId: string) {
  const url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=contentDetails&part=id&part=snippet&part=status&maxResults=100&playlistId=${playlistId}&key=${process.env.PRIVATE_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}
