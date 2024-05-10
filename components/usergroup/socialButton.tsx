import classNames from "classnames";
import dynamic from "next/dynamic";
import * as React from "react";
import { CustomLink } from "../customLink";

const SiFacebook = dynamic(() =>
  import("react-icons/si").then((icon) => icon.SiFacebook)
);
const SiGithub = dynamic(() =>
  import("react-icons/si").then((icon) => icon.SiGithub)
);
const SiLinkedin = dynamic(() =>
  import("react-icons/si").then((icon) => icon.SiLinkedin)
);
const SiMeetup = dynamic(() =>
  import("react-icons/si").then((icon) => icon.SiMeetup)
);

export const platformList = [
  "facebook",
  "github",
  "linkedin",
  "meetup",
] as const;

export const platforms: Record<
  (typeof platformList)[number],
  { icon: () => JSX.Element; color: string }
> = {
  facebook: {
    icon: () => <SiFacebook className="text-white" size={40} />,
    color: "#4479DE",
  },
  github: {
    icon: () => <SiGithub className="text-white" size={40} />,
    color: "#212121",
  },
  linkedin: {
    icon: () => <SiLinkedin className="text-white" size={40} />,
    color: "#326C9C",
  },
  meetup: {
    icon: () => <SiMeetup className="text-white" size={40} />,
    color: "#E35063",
  },
} as const;

export type PlatformType = (typeof platformList)[number];

type SocialButtonProps = {
  className?: string;
  url?: string;
  platform?: PlatformType;
  label?: string;
  "data-tina-field"?: string;
};

export const SocialButton = ({
  className,
  url,
  platform,
  label,
  "data-tina-field": tinaField,
}: SocialButtonProps) => {
  return (
    <CustomLink
      href={url}
      className={classNames("flex items-center !no-underline", className)}
      data-tina-field={tinaField}
    >
      <div
        style={{ backgroundColor: platforms[platform]?.color }}
        className="inline-flex w-full items-center rounded-lg"
      >
        <span className="m-4 ml-8">{platforms[platform]?.icon()}</span>
        <span className="text-base font-bold text-white">{label}</span>
      </div>
    </CustomLink>
  );
};
