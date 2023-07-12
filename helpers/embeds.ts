// Taken from https://github.com/cookpete/react-player/blob/master/src/patterns.js#L3
const MATCH_URL_YOUTUBE =
  /(?:youtu\.be\/|youtube(?:-nocookie|education)?\.com\/(?:embed\/|v\/|watch\/|watch\?v=|watch\?.+&v=|shorts\/|live\/))((\w|-){11})|youtube\.com\/playlist\?list=|youtube\.com\/user\//;

export const getYouTubeId = (url: string) => {
  if (!url) return "";
  const match = url.match(MATCH_URL_YOUTUBE);
  return match && match[1];
};
