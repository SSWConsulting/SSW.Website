import { useEffect, useState } from "react";
import { Template } from "tinacms";

export type TweetEmbedProps = {
  url: string;
};

type Tweet = {
  html: string;
};

export const TweetEmbed = (props: TweetEmbedProps) => {
  const [tweet, setTweet] = useState<Tweet>(null);

  useEffect(() => {
    fetch(`https://publish.twitter.com/oembed?url=${props.url}`)
      .then((res) => res.json())
      .then((json) => setTweet(json))
      .catch((err) => console.error(err));
  }, []);

  if (!tweet) return <></>;

  return <div dangerouslySetInnerHTML={{ __html: tweet.html }} />;
};

export const TweetEmbedSchema: Template = {
  label: "Tweet Embed",
  name: "TweetEmbed",
  fields: [
    {
      type: "string",
      name: "url",
      label: "Tweet URL",
      required: true,
    },
  ],
};
