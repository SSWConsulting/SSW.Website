"use client";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
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

export enum SocialTypes {
  phone = "phone",
  youtube = "youtube",
  linkedin = "linkedin",
  facebook = "facebook",
  instagram = "instagram",
  meetup = "meetup",
  xtwitter = "xtwitter",
  tiktok = "tiktok",
  github = "github",
}

const socialStyles = new Map<
  SocialTypes,
  { icon: IconType; bgClassName: string; fill?: string }
>([
  [
    SocialTypes.phone,
    {
      icon: FaPhone,
      bgClassName: "bg-sswRed",
    },
  ],
  [
    SocialTypes.youtube,
    {
      icon: FaYoutube,
      bgClassName: "bg-social-youtube",
    },
  ],
  [
    SocialTypes.linkedin,
    {
      icon: FaLinkedinIn,
      bgClassName: "bg-social-linkedin",
    },
  ],
  [
    SocialTypes.facebook,
    {
      icon: FaFacebookF,
      bgClassName: "bg-social-facebook",
    },
  ],
  [
    SocialTypes.instagram,
    {
      icon: FaInstagram,
      bgClassName: "bg-gradient-tr-social-instagram",
    },
  ],
  [
    SocialTypes.xtwitter,
    {
      icon: FaXTwitter,
      bgClassName: "bg-social-xtwitter",
    },
  ],
  [
    SocialTypes.tiktok,
    {
      icon: FaTiktok,
      bgClassName: "bg-social-tiktok",
    },
  ],
  [
    SocialTypes.github,
    {
      icon: FaGithub,
      bgClassName: "bg-social-github",
      fill: "black",
    },
  ],
  [
    SocialTypes.meetup,
    {
      icon: FaMeetup,
      bgClassName: "bg-social-meetup",
    },
  ],
]);

export interface SocialIconsParams {
  className?: string;
  excludeDesktop?: SocialTypes[];
  excludeMobile?: SocialTypes[];
}

export const SocialIcons = (data?: SocialIconsParams) => {
  const [isMobileDetected, setIsMobileDetected] = useState(false);
  useEffect(() => {
    setIsMobileDetected(isMobile);
  }, []);

  return (
    <div
      className={classNames(
        "flex flex-grow flex-wrap gap-2 sm:flex-grow-0",
        data?.className
      )}
    >
      {layoutData.socials.map((social) => {
        const hideOnDesktop =
          data.excludeDesktop?.length &&
          data.excludeDesktop.includes(SocialTypes[social.type]);
        const hideOnMobile =
          data.excludeMobile?.length &&
          data.excludeMobile.includes(SocialTypes[social.type]);

        if (hideOnDesktop && hideOnMobile) {
          return null;
        }

        const styling = socialStyles.get(SocialTypes[social.type]);
        const growOnMobile =
          !hideOnMobile &&
          Object.values(SocialTypes).length - data.excludeMobile?.length === 1;

        const URL =
          social.desktopSpecificURL && !isMobileDetected
            ? social.desktopSpecificURL
            : social.url;
        const TEXT =
          social.desktopSpecificLinkText && !isMobileDetected
            ? social.desktopSpecificLinkText
            : social.linkText;

        return (
          <CustomLink
            key={social.type}
            href={URL}
            className={classNames(
              "unstyled flex h-12 cursor-pointer items-center justify-center rounded-lg text-xl hover:opacity-70",
              styling.bgClassName,
              TEXT ? "w-fit shrink-0" : "w-12",
              { "px-5": TEXT },
              { "flex sm:hidden": hideOnDesktop },
              { "hidden sm:flex": hideOnMobile },
              { "flex-grow sm:flex-grow-0": growOnMobile }
            )}
            title={social.title}
          >
            <styling.icon
              className={classNames({ "text-2xl": !TEXT })}
              color={styling.fill ?? "white"}
            />
            {TEXT && (
              <span className="ml-2 inline text-sm font-bold text-white">
                {TEXT}
              </span>
            )}
          </CustomLink>
        );
      })}
    </div>
  );
};
