import * as React from "react";
import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import { FacebookPageEmbed } from "../../embeds/facebookPageEmbed";
import { TwitterFeedEmbed } from "../../embeds/twitterFeedEmbed";
import { Container } from "../../util/container";
import { PlatformType, SocialButton, platformList } from "../socialButton";

type CommunitySectionProps = {
  heading?: string;
  twitterUsername?: string;
  facebookUsername?: string;
  socialButtons: {
    url?: string;
    label?: string;
    platform?: PlatformType;
  }[];
};

export const CommunitySection = (props: CommunitySectionProps) => {
  return (
    <section>
      <Container>
        <div className="flex flex-col items-center">
          <h2
            className="mb-12 text-4xl font-semibold text-sswRed"
            data-tina-field={tinaField(props, "heading")}
          >
            {props.heading || "Community"}
          </h2>
          <div className="w-full grid-cols-3 gap-6 md:grid">
            <div
              className="col-span-1 h-96"
              data-tina-field={tinaField(props, "twitterUsername")}
            >
              <TwitterFeedEmbed
                height={384}
                username={props?.twitterUsername || "SSW_TV"}
              />
            </div>
            <div
              className="col-span-1"
              data-tina-field={tinaField(props, "facebookUsername")}
            >
              <FacebookPageEmbed
                className="mx-auto w-full justify-center justify-self-center"
                username={props?.facebookUsername || "SSW.page"}
                height={384}
              />
            </div>
            <div className="col-span-1">
              {props?.socialButtons?.map((button, index) => (
                <SocialButton
                  data-tina-field={tinaField(
                    props.socialButtons[index],
                    "label"
                  )}
                  key={index}
                  url={button.url}
                  platform={button.platform}
                  label={button.label}
                  className="mb-4"
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export const communitySectionBlockSchema: Template = {
  name: "CommunitySection",
  label: "Community Section",
  fields: [
    {
      type: "string",
      label: "Heading",
      name: "heading",
    },
    {
      type: "string",
      label: "Twitter Username",
      name: "twitterUsername",
    },
    {
      type: "string",
      label: "Facebook Username",
      name: "facebookUsername",
    },
    {
      type: "object",
      list: true,
      label: "Social Buttons",
      name: "socialButtons",
      fields: [
        {
          type: "string",
          label: "URL",
          name: "url",
        },
        {
          type: "string",
          label: "Label",
          name: "label",
        },
        {
          type: "string",
          label: "Platform",
          name: "platform",
          options: platformList.map((e) => ({ label: e, value: e })),
        },
      ],
      ui: {
        itemProps: (item) => {
          return { label: item?.label };
        },
      },
    },
  ],
};
