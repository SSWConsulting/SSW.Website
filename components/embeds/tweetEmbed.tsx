"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import type { Template } from "tinacms";

export type TweetEmbedProps = {
  url: string;
};

type Tweet = {
  html: string;
};

export const TweetEmbed = (props: TweetEmbedProps) => {
  const [tweet, setTweet] = useState<Tweet>(null);

  useEffect(() => {
    fetch(`/api/get-tweet-embed?url=${encodeURIComponent(props.url)}`)
      .then((res) => res.json())
      .then((json) => setTweet(json));
  }, [props.url]);

  if (!tweet) return <></>;

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: tweet?.html }} />
      <Script async src="https://platform.twitter.com/widgets.js" />
    </>
  );
};

export const tweetEmbedSchema: Template = {
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
