import React from 'react';
import Link from 'next/link';

import layoutData from "../../content/global/index.json";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import {
    faYoutube,
    faLinkedinIn,
    faFacebookF,
    faInstagram,
    faTwitter,
    faGithub,
    faTiktok,
} from '@fortawesome/free-brands-svg-icons';


const socialStyles = {
    phone: {
        icon: faPhone,
        style: {
            backgroundColor: '#b31217',
        }
    },
    youtube: {
        icon: faYoutube,
        style: {
            backgroundColor: '#b31217',
        }
    },
    linkedin: {
        icon: faLinkedinIn,
        style: {
            backgroundColor: '#0077b5',
        }
    },
    facebook: {
        icon: faFacebookF,
        style: {
            backgroundColor: '#3b5998',
        }
    },
    instagram: {
        icon: faInstagram,
        style: {
            background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
            backgroundColor: '#bc1888',
        }
    },
    twitter: {
        icon: faTwitter,
        style: {
            backgroundColor: '#55acee',
        }
    },
    tiktok: {
        icon: faTiktok,
        style: {
            backgroundColor: '#000',
        }
    },
    github: {
        icon: faGithub,
        style: {
            backgroundColor: '#000',
        }
    },
};

export const SocialIcons = ({ className }) => {
    return (   
        <div className={`flex gap-2 ${className}`}>
            {layoutData.socials.map(social => {
                const { icon, style } = socialStyles[social.type];
                return (
                    <SocialIcon key={social.type}
                        icon={icon}
                        title={social.title}
                        linkText={social.linkText}
                        url={social.url}
                        style={style} />
                )
            })}
        </div>
    );
}

class SocialIconParams {
    icon: IconDefinition;
    title: string;
    url: string;
    linkText?: string;
    style?: React.CSSProperties;
}

const SocialIcon = ({ icon, title, url, linkText, style }: SocialIconParams) => {
    const widthClass = linkText ? 'w-fit' : 'w-6';
    const paddingClass = linkText ? 'pl-2 pr-2' : '';
    return (        
        <Link href={url}>
            <a
                className={`h-6 ${widthClass} ${paddingClass} flex justify-center items-center text-base hover:bg-gray-1000 hover:bg-none cursor-pointer`}
                style={style}
                title={title}
                
                target="_blank"
                rel="noreferrer nofollow"
            >
                <FontAwesomeIcon icon={icon} color="white" />
                {linkText && <span className="ml-2 text-white text-xs font-bold">{linkText}</span>}
            </a>
        </Link>
    )
}