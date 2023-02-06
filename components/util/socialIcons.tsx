import React from "react";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import {
    faYoutube,
    faLinkedinIn,
    faFacebookF,
    faInstagram,
    faTwitter,
    faGithub,
    faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import classNames from "classnames";

import layoutData from "../../content/global/index.json";

export enum SocialTypes {
    phone = "phone",
    youtube = "youtube",
    linkedin = "linkedin",
    facebook = "facebook",
    instagram = "instagram",
    twitter = "twitter",
    tiktok = "tiktok",
    github = "github",
}

const socialStyles = new Map<SocialTypes, { icon: IconDefinition, bgClassName: string }>([
    [SocialTypes.phone, {
        icon: faPhone,
        bgClassName: "bg-phone",
    }],
    [SocialTypes.youtube, {
        icon: faYoutube,
        bgClassName: "bg-youtube",
    }],
    [SocialTypes.linkedin, {
        icon: faLinkedinIn,
        bgClassName: "bg-linkedin",
    }],
    [SocialTypes.facebook, {
        icon: faFacebookF,
        bgClassName: "bg-facebook",
    }],
    [SocialTypes.instagram, {
        icon: faInstagram,
        bgClassName: "bg-instagram",
    }],
    [SocialTypes.twitter, {
        icon: faTwitter,
        bgClassName: "bg-twitter",
    }],
    [SocialTypes.tiktok, {
        icon: faTiktok,
        bgClassName: "bg-tiktok",
    }],
    [SocialTypes.github, {
        icon: faGithub,
        bgClassName: "bg-github",
    }],
]);

export interface SocialIconsParams {
    className?: string;
    excludeDesktop?: SocialTypes[];
    excludeMobile?: SocialTypes[];
}

export const SocialIcons = (data?: SocialIconsParams) => {
    return (   
        <div className={
            classNames(
                "flex gap-2 flex-grow sm:flex-grow-0", 
                data?.className,
            )}
        >
            {layoutData.socials.map(social => {
                const hideOnDesktop = data.excludeDesktop?.length && data.excludeDesktop.includes(SocialTypes[social.type]);
                const hideOnMobile = data.excludeMobile?.length && data.excludeMobile.includes(SocialTypes[social.type]);
                
                if (hideOnDesktop && hideOnMobile) {
                    return null;
                }

                const styling = socialStyles.get(SocialTypes[social.type]);
                const growOnMobile = !hideOnMobile && (Object.values(SocialTypes).length - data.excludeMobile?.length) === 1;

                return (
                    <Link key={social.type} href={social.url}>
                        <a
                            className={classNames(
                                "h-11 flex justify-center items-center text-base hover:bg-gray-1000 hover:bg-none cursor-pointer",
                                styling.bgClassName,
                                social.linkText ? "w-fit" : "w-11",
                                { "px-6" : social.linkText },
                                { "flex sm:hidden": hideOnDesktop },
                                { "hidden sm:flex": hideOnMobile },
                                { "flex-grow sm:flex-grow-0": growOnMobile },
                            )}
                            title={social.title}                            
                            target="_blank"
                            rel="noreferrer nofollow"
                        >
                            <FontAwesomeIcon className={classNames({"text-3xl" : !social.linkText})} icon={styling.icon} color="white" />
                            {social.linkText && <span className="ml-2 inline text-base font-bold text-white">{social.linkText}</span>}
                        </a>
                    </Link>
                )
            })}
        </div>
    );
}
