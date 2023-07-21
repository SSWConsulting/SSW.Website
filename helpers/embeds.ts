// Taken from https://github.com/cookpete/react-player/blob/master/src/patterns.js#L3
export const MATCH_URL_YOUTUBE =
  /(?:youtu\.be\/|youtube(?:-nocookie|education)?\.com\/(?:embed\/|v\/|watch\/|watch\?v=|watch\?.+&v=|shorts\/|live\/))((\w|-){11})|youtube\.com\/playlist\?list=|youtube\.com\/user\//;
// Taken from https://stackoverflow.com/questions/41208456/javascript-regex-vimeo-id
/* eslint-disable no-useless-escape */
export const MATCH_URL_VIMEO =
  /(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)(?:[a-zA-Z0-9_\-]+)?/i;

export const getYouTubeId = (url: string) => {
  if (!url) return "";
  const match = url.match(MATCH_URL_YOUTUBE);
  return match && match[1];
};

export const getVimeoId = (url: string) => {
  if (!url) return "";
  const match = url.match(MATCH_URL_VIMEO);
  return match && match[1];
};
