import Script from "next/script";
import { useEffect, useState } from "react";
import { Template } from "tinacms";

export type TweetEmbedProps = {
  url: string;
};

export const TweetEmbed = (props: TweetEmbedProps) => {
  const [tweet, setTweet] = useState(null);

  useEffect(() => {
    fetch(`https://publish.twitter.com/oembed?url=${props.url}`)
      .then((res) => res.json())
      .then((json) => setTweet(json));
  }, [props.url]);

  return (
    <div>
      <blockquote className="twitter-tweet">
        <p lang="en" dir="ltr">
          Hey{" "}
          <a href="https://twitter.com/NDCconferences?ref_src=twsrc%5Etfw">
            @NDCconferences
          </a>{" "}
          <a href="https://twitter.com/hashtag/Sydney?src=hash&amp;ref_src=twsrc%5Etfw">
            #Sydney
          </a>{" "}
          attendees! Do you want some cool prizes? You can win anything from a{" "}
          <a href="https://twitter.com/hashtag/googlenesthub?src=hash&amp;ref_src=twsrc%5Etfw">
            #googlenesthub
          </a>{" "}
          to{" "}
          <a href="https://twitter.com/hashtag/Xiaomi?src=hash&amp;ref_src=twsrc%5Etfw">
            #Xiaomi
          </a>{" "}
          Mi Bands! Watch this video to see how you can win the SSW Treasure
          hunt! 🤙 👀{" "}
          <a href="https://t.co/HaPePO168o">pic.twitter.com/HaPePO168o</a>
        </p>
        &mdash; SSW / SSW TV (@SSW_TV){" "}
        <a href="https://twitter.com/SSW_TV/status/1184008604619284482?ref_src=twsrc%5Etfw">
          October 15, 2019
        </a>
      </blockquote>{" "}
      <Script async src="https://platform.twitter.com/widgets.js"></Script>
    </div>
  );
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
