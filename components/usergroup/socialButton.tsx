import { SiFacebook, SiLinkedin, SiMeetup, SiGithub } from "react-icons/si";
import classNames from "classnames";
import * as React from "react";

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
};

export const SocialButton = ({
  className,
  url,
  platform,
  label,
}: SocialButtonProps) => {
  return (
    <a
      href={url}
      className={classNames("flex items-center !no-underline", className)}
    >
      <div
        style={{ backgroundColor: platforms[platform]?.color }}
        className="inline-flex w-full items-center rounded-lg"
      >
        <span className="m-4 ml-8">{platforms[platform]?.icon()}</span>
        <span className="font-helvetica text-base font-bold text-white">
          {label}
        </span>
      </div>
    </a>
  );
};
