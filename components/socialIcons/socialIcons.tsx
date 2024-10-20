"use client";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { IconType } from "react-icons";

const FaFacebookF = dynamic(() =>
  import("react-icons/fa").then((module) => ({ default: module.FaFacebookF }))
);
const FaGithub = dynamic(() =>
  import("react-icons/fa").then((module) => ({ default: module.FaGithub }))
);
const FaInstagram = dynamic(() =>
  import("react-icons/fa").then((module) => ({ default: module.FaInstagram }))
);
const FaLinkedinIn = dynamic(() =>
  import("react-icons/fa").then((module) => ({ default: module.FaLinkedinIn }))
);
const FaMeetup = dynamic(() =>
  import("react-icons/fa").then((module) => ({ default: module.FaMeetup }))
);
const FaTiktok = dynamic(() =>
  import("react-icons/fa").then((module) => ({ default: module.FaTiktok }))
);
const FaYoutube = dynamic(() =>
  import("react-icons/fa").then((module) => ({ default: module.FaYoutube }))
);

import dynamic from "next/dynamic";
import { FaXTwitter } from "react-icons/fa6";
import layoutData from "../../content/global/index.json";
import { CustomLink } from "../customLink";

export type SocialTypes =
  | "youtube"
  | "linkedin"
  | "facebook"
  | "instagram"
  | "meetup"
  | "xtwitter"
  | "tiktok"
  | "github";

export const socialStyles: Record<
  SocialTypes,
  { icon: IconType; bgClassName: string; fill?: string }
> = {
  youtube: {
    icon: FaYoutube as IconType,
    bgClassName: "bg-social-youtube",
  },
  linkedin: {
    icon: FaLinkedinIn as IconType,
    bgClassName: "bg-social-linkedin",
  },
  facebook: {
    icon: FaFacebookF as IconType,
    bgClassName: "bg-social-facebook",
  },
  instagram: {
    icon: FaInstagram as IconType,
    bgClassName: "bg-gradient-tr-social-instagram",
  },
  xtwitter: {
    icon: FaXTwitter,
    bgClassName: "bg-social-xtwitter",
  },
  tiktok: {
    icon: FaTiktok as IconType,
    bgClassName: "bg-social-tiktok",
  },
  github: {
    icon: FaGithub as IconType,
    bgClassName: "bg-social-github",
    fill: "black",
  },
  meetup: {
    icon: FaMeetup as IconType,
    bgClassName: "bg-social-meetup",
  },
} as const;

type SocialIconsProps = {
  className?: string;
  excludeDesktop?: SocialTypes[];
  excludeMobile?: SocialTypes[];
};

export const SocialIcons = ({
  excludeDesktop,
  excludeMobile,
  className,
}: SocialIconsProps) => {
  const [isOnMobile, setIsOnMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && isMobile) {
      setIsOnMobile(true);
    }
  }, []);

  return (
    <div
      className={classNames(
        "flex flex-grow flex-wrap gap-2 sm:flex-grow-0",
        className
      )}
    >
      {layoutData.socials.map((social, index) => {
        const hideOnDesktop =
          excludeDesktop?.length &&
          !!excludeDesktop.find((icon) => icon === social.type);

        const hideOnMobile =
          excludeMobile?.length &&
          !!excludeMobile.find((icon) => icon === social.type);

        if (
          (hideOnDesktop && hideOnMobile) ||
          (isOnMobile && hideOnMobile) ||
          (!isOnMobile && hideOnDesktop)
        ) {
          return null;
        }

        return <SocialIcon key={social.type + index} social={social} />;
      })}
    </div>
  );
};

type SocialIconProps = {
  social: (typeof layoutData.socials)[number];
};

export const SocialIcon = ({ social }: SocialIconProps) => {
  const url = social.url;

  const styling = socialStyles[social.type];

  const Icon = styling.icon;

  return (
    <CustomLink
      href={url}
      className={classNames(
        "unstyled flex h-12 w-12 cursor-pointer items-center justify-center rounded-lg text-xl hover:opacity-70",
        styling.bgClassName
      )}
      title={social.title}
      aria-label={"Link to " + social.title}
    >
      <Icon className="text-2xl" color={styling.fill ?? "white"} />
    </CustomLink>
  );
};
