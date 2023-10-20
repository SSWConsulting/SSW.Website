"use client";
import classNames from "classnames";
import Link from "next/link";
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
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

import layoutData from "../../content/global/index.json";

export enum SocialTypes {
  phone = "phone",
  youtube = "youtube",
  linkedin = "linkedin",
  facebook = "facebook",
  instagram = "instagram",
  meetup = "meetup",
  twitter = "twitter",
  tiktok = "tiktok",
  github = "github",
}

const socialStyles = new Map<
  SocialTypes,
  { icon: IconType; bgClassName: string }
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
    SocialTypes.twitter,
    {
      icon: FaTwitter,
      bgClassName: "bg-social-twitter",
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
          <Link
            key={social.type}
            href={URL}
            className={classNames(
              "unstyled flex h-12 cursor-pointer items-center justify-center rounded-lg text-xl hover:bg-gray-900 hover:bg-none",
              styling.bgClassName,
              TEXT ? "w-fit shrink-0" : "w-12",
              { "px-5": TEXT },
              { "flex sm:hidden": hideOnDesktop },
              { "hidden sm:flex": hideOnMobile },
              { "flex-grow sm:flex-grow-0": growOnMobile }
            )}
            title={social.title}
            target={social.openInSameWindow ? "_self" : "_blank"}
            rel="noreferrer nofollow"
          >
            <styling.icon
              className={classNames({ "text-2xl": !TEXT })}
              color="white"
            />
            {TEXT && (
              <span className="ml-2 inline text-sm font-bold text-white">
                {TEXT}
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );
};
