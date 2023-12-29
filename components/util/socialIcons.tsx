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
  FaPhoneAlt as FaPhone,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";
import layoutData from "../../content/global/index.json";
import { CustomLink } from "../customLink";

export type SocialTypes =
  | "phone"
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
  phone: {
    icon: FaPhone,
    bgClassName: "bg-sswRed",
  },
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
  const isMobileDetected = isMobile;
  const growOnMobile =
    Object.keys(socialStyles).length - excludeMobile?.length === 1;

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

        if (hideOnDesktop && hideOnMobile) {
          return <></>;
        }

        return (
          <SocialIcon
            key={social.type}
            social={social}
            isMobileDetected={isMobileDetected}
            hideOnDesktop={hideOnDesktop}
            hideOnMobile={hideOnMobile}
            growOnMobile={growOnMobile}
          />
        );
      })}
    </div>
  );
};

type SocialIconProps = {
  social: (typeof layoutData.socials)[number];
  isMobileDetected: boolean;
  hideOnDesktop?: boolean;
  hideOnMobile?: boolean;
  growOnMobile?: boolean;
};

export const SocialIcon = ({
  social,
  isMobileDetected,
  hideOnDesktop,
  hideOnMobile,
  growOnMobile,
}: SocialIconProps) => {
  const url =
    social.desktopSpecificURL && !isMobileDetected
      ? social.desktopSpecificURL
      : social.url;
  const text =
    social.desktopSpecificLinkText && !isMobileDetected
      ? social.desktopSpecificLinkText
      : social.linkText;

  const styling = socialStyles[social.type];

  const Icon = styling.icon;

  return (
    <CustomLink
      href={url}
      className={classNames(
        "unstyled flex h-12 cursor-pointer items-center justify-center rounded-lg text-xl hover:opacity-70",
        styling.bgClassName,
        text ? "w-fit shrink-0" : "w-12",
        { "px-5": text },
        { "flex sm:hidden": hideOnDesktop },
        { "hidden sm:flex": hideOnMobile },
        { "flex-grow sm:flex-grow-0": growOnMobile }
      )}
      title={social.title}
    >
      <Icon
        className={classNames({ "text-2xl": !text })}
        color={styling.fill ?? "white"}
      />
      {text && (
        <span className="ml-2 inline text-sm font-bold text-white">{text}</span>
      )}
    </CustomLink>
  );
};
