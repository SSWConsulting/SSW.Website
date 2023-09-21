import { FacebookPageEmbed } from "../../embeds/facebookPageEmbed";
import { TwitterFeedEmbed } from "../../embeds/twitterFeedEmbed";
import { Container } from "../../util/container";
import { PlatformType, SocialButton, platforms } from "../socialButton";
import type { Template } from "tinacms";

type CommunitySectionProps = {
  data: {
    twitterUsername?: string;
    facebookUsername?: string;
    socialButtons: {
      url?: string;
      label?: string;
      platform?: PlatformType;
    }[];
  };
};

export const CommunitySection = ({
  data: { twitterUsername, facebookUsername, socialButtons },
}: CommunitySectionProps) => {
  return (
    <section>
      <Container>
        <div className="flex flex-col items-center">
          <h2 className="mb-12 font-helvetica text-4xl font-semibold text-sswRed">
            Community
          </h2>
          <div className="w-full grid-cols-3 gap-6 md:grid">
            <div className="col-span-1 h-96">
              <TwitterFeedEmbed height={384} username="SSW_TV" />
            </div>
            <div className="col-span-1">
              <FacebookPageEmbed username="SSW.page" height={384} />
            </div>
            <div className="col-span-1">
              <SocialButton
                url="https://github.com/netusergroup/sydney-user-group/discussions"
                platform="github"
                label="Join GitHub Discussion"
                className="mb-4"
              />
              <SocialButton
                url="https://www.facebook.com/groups/NetUG/"
                platform="facebook"
                label="Join Facebook Group"
                className="mb-4"
              />
              <SocialButton
                url="https://www.linkedin.com/groups/1520317/"
                platform="linkedin"
                label="Join LinkedIn Group"
                className="mb-4"
              />
              <SocialButton
                url="https://www.meetup.com/sydney-net-user-group/join/"
                platform="meetup"
                label="Join Meetup Group"
                className="mb-4"
              />
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
          options: Object.keys(platforms),
        },
      ],
    },
  ],
};
