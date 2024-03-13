"use client";
import classNames from "classnames";
import React from "react";
import { isMobile } from "react-device-detect";
import { IconType } from "react-icons";

import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaMeetup,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";

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
    icon: FaYoutube,
    bgClassName: "bg-social-youtube",
  },
  linkedin: {
    icon: FaLinkedinIn,
    bgClassName: "bg-social-linkedin",
  },
  facebook: {
    icon: FaFacebookF,
    bgClassName: "bg-social-facebook",
  },
  instagram: {
    icon: FaInstagram,
    bgClassName: "bg-gradient-tr-social-instagram",
  },
  xtwitter: {
    icon: FaXTwitter,
    bgClassName: "bg-social-xtwitter",
  },
  tiktok: {
    icon: FaTiktok,
    bgClassName: "bg-social-tiktok",
  },
  github: {
    icon: FaGithub,
    bgClassName: "bg-social-github",
    fill: "black",
  },
  meetup: {
    icon: FaMeetup,
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
  return (
    <div
      className={classNames(
        "flex flex-grow flex-wrap gap-2 sm:flex-grow-0",
        className
      )}
    >
      {layoutData.socials.map((social) => {
        const hideOnDesktop =
          excludeDesktop?.length &&
          !!excludeDesktop.find((icon) => icon === social.type);

        const hideOnMobile =
          excludeMobile?.length &&
          !!excludeMobile.find((icon) => icon === social.type);

        if (
          (hideOnDesktop && hideOnMobile) ||
          (isMobile && hideOnMobile) ||
          (!isMobile && hideOnDesktop)
        ) {
          return <></>;
        }

        return <SocialIcon key={social.type} social={social} />;
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
    >
      <Icon className="text-2xl" color={styling.fill ?? "white"} />
    </CustomLink>
  );
};
