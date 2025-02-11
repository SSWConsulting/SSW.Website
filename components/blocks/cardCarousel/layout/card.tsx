import { ListItem } from "@/components/blocksSubtemplates/listItem";
import { PillGroup } from "@/components/blocksSubtemplates/pillGroup";
import { YouTubeEmbed } from "@/components/embeds/youtubeEmbed";
import getYouTubeVideoId from "@/services/client/youtube.service";
import Image from "next/image";
import { useState } from "react";
import { tinaField } from "tinacms/dist/react";
import { cardOptions } from "../../../blocksSubtemplates/tinaFormElements/colourOptions/cardOptions";
import { Icon } from "../../../blocksSubtemplates/tinaFormElements/icon";

type CardProps = {
  data;
  placeholder: boolean;
};

const Card = ({ data, placeholder }: CardProps) => {
  const isYoutubeEmbed = data.mediaType === "youtube";
  const youtubeEmbedId = isYoutubeEmbed
    ? getYouTubeVideoId(data.youtubeUrl)
    : null;
  const [usePlaceholder, setUsePlaceholder] = useState(false);
  const placeholderImage = "/images/videoPlaceholder.png";

  return (
    <div
      className={`flex w-90 shrink flex-col rounded-md text-start ${
        cardOptions.find((value) => {
          return value.reference === data.cardStyle;
        })?.classes
      }`}
    >
      {youtubeEmbedId && isYoutubeEmbed ? (
        <YouTubeEmbed
          showSeparateChannelPreviews={false}
          controls={0}
          className="mb-2 aspect-video w-full rounded-md"
          id={youtubeEmbedId}
        />
      ) : (
        (data.image || placeholder) && (
          <div
            className="relative mb-2 aspect-video w-full shrink-0 overflow-hidden rounded-md"
            data-tina-field={tinaField(data, "image")}
          >
            <Image
              src={
                usePlaceholder
                  ? placeholderImage
                  : (data.image ?? placeholderImage)
              }
              onError={() => setUsePlaceholder(true)}
              alt={data.altText ?? "Card Image"}
              fill={true}
              className={data.contain ? "object-contain" : "object-cover"}
            />
          </div>
        )
      )}
      <Icon data={{ name: data.icon }} className="size-6 text-sswRed" />
      {data.chips && <PillGroup data={data.chips} />}
      <h3
        className="pb-2 text-xl font-semibold leading-6 dark:text-gray-200"
        data-tina-field={tinaField(data, "heading")}
      >
        {data.heading}
      </h3>
      {data.description && (
        <p
          className="text-base font-light dark:text-gray-300"
          data-tina-field={tinaField(data, "description")}
        >
          {data.description}
        </p>
      )}
      {data.featureList?.features?.map((item, index) => {
        return <ListItem key={index} data={item} />;
      })}
      {data.embeddedButton && (
        <div className="flex h-full flex-col-reverse justify-between">
          <a
            href={data.embeddedButton.buttonLink}
            className="pt-2 font-semibold text-white !decoration-gray-400 !decoration-1 hover:!decoration-sswRed"
          >
            {data.embeddedButton.buttonText}
            <Icon
              data={{ name: data.embeddedButton.icon }}
              className="inline size-4"
            />
          </a>
        </div>
      )}
    </div>
  );
};

export { Card };
