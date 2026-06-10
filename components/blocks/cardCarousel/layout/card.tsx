import { ListItem } from "@/components/blocksSubtemplates/listItem";
import { PillGroup } from "@/components/blocksSubtemplates/pillGroup";
import { cn } from "@/lib/utils";

import { VideoModal } from "@/components/videoModal";
import Image from "next/image";
import { useState } from "react";
import { tinaField } from "tinacms/dist/react";
import RippleButton, { ColorVariant } from "../../../button/rippleButtonV2";
import { EventbriteModalButton } from "../../eventbrite/eventbriteModalButton";
import { cardOptions } from "../../../blocksSubtemplates/tinaFormElements/colourOptions/cardOptions";
import { Icon } from "../../../blocksSubtemplates/tinaFormElements/icon";

const buttonVariants: ColorVariant[] = ["primary", "secondary", "ghost"];

type CardProps = {
  data;
  placeholder: boolean;
  className?: string;
};

const Card = ({ data, placeholder, className }: CardProps) => {
  const isYoutubeEmbed = data.mediaType === "youtube";
  const youtubeUrl = data.youtubeUrl;
  const [usePlaceholder, setUsePlaceholder] = useState(false);
  const placeholderImage = "/images/videoPlaceholder.png";

  return (
    <div
      className={cn(
        "flex shrink flex-col rounded-md text-start",
        className,
        cardOptions.find((value) => {
          return value.reference === data.cardStyle;
        })?.classes
      )}
    >
      {youtubeUrl && isYoutubeEmbed ? (
        <VideoModal
          className="mb-2"
          frameClassName="rounded mb-2"
          overflow={true}
          url={youtubeUrl}
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
      {data.embeddedButton?.buttonText && (
        <div className="flex h-full flex-col-reverse justify-between">
          {(() => {
            const variant =
              buttonVariants[data.embeddedButton.colour ?? 2] ?? "ghost";
            const buttonInner = (
              <>
                {data.embeddedButton.buttonText}
                <Icon
                  data={{ name: data.embeddedButton.icon }}
                  className="inline size-4"
                />
              </>
            );
            if (data.embeddedButton.eventbriteEventId) {
              return (
                <EventbriteModalButton
                  eventId={data.embeddedButton.eventbriteEventId}
                  variant={variant}
                  className={cn("mt-2 self-start")}
                  textTinaField={tinaField(data.embeddedButton, "buttonText")}
                >
                  {buttonInner}
                </EventbriteModalButton>
              );
            }
            return data.embeddedButton.buttonLink ? (
              <a
                href={data.embeddedButton.buttonLink}
                className={cn("mt-2 self-start")}
              >
                <RippleButton
                  variant={variant}
                  textTinaField={tinaField(data.embeddedButton, "buttonText")}
                >
                  {buttonInner}
                </RippleButton>
              </a>
            ) : (
              <RippleButton
                variant={variant}
                className={cn("mt-2 self-start")}
                textTinaField={tinaField(data.embeddedButton, "buttonText")}
              >
                {buttonInner}
              </RippleButton>
            );
          })()}
        </div>
      )}
    </div>
  );
};

export { Card };
