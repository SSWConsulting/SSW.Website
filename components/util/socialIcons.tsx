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

const socialStyles: Record<
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
};

export interface SocialIconsProps {
  className?: string;
  excludeDesktop?: SocialTypes[] | boolean;
  excludeMobile?: SocialTypes[] | boolean;
}

export const SocialIcons = (data?: SocialIconsProps) => {
  const isMobileDetected = isMobile;

  return (
    <div
      className={classNames(
        "flex flex-grow flex-wrap gap-2 sm:flex-grow-0",
        data?.className
      )}
    >
      {layoutData.socials.map((social) => (
        <SocialIcon
          key={social.type}
          social={social}
          isMobileDetected={isMobileDetected}
          excludeDesktop={data?.excludeDesktop}
          excludeMobile={data?.excludeMobile}
        />
      ))}
    </div>
  );
};

// TODO: This component does not adhere to the single responsibility principle (SOLID)
// Can be fixed by separating the phone component from other social icons
export const SocialIcon = ({
  social,
  isMobileDetected,
  excludeDesktop,
  excludeMobile,
}) => {
  if (excludeDesktop === true) {
    excludeDesktop = Object.keys(socialStyles);
  }
  if (excludeMobile === true) {
    excludeMobile = Object.keys(socialStyles);
  }

  const hideOnDesktop =
    excludeDesktop?.length && excludeDesktop.includes(social.type);
  const hideOnMobile =
    excludeMobile?.length && excludeMobile.includes(social.type);
  const styling = socialStyles[social.type];

  if ((hideOnDesktop && hideOnMobile) || !styling) {
    return <></>;
  }

  const growOnMobile =
    !hideOnMobile &&
    Object.keys(SocialIcons).length - excludeMobile?.length === 1;

  const url =
    social.desktopSpecificURL && !isMobileDetected
      ? social.desktopSpecificURL
      : social.url;
  const text =
    social.desktopSpecificLinkText && !isMobileDetected
      ? social.desktopSpecificLinkText
      : social.linkText;

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
