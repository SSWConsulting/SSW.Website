import React from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import {
    faYoutube,
    faLinkedinIn,
    faFacebookF,
    faInstagram,
    faTwitter,
    faTiktok,
} from '@fortawesome/free-brands-svg-icons';

class SocialIconParams {
    icon: IconDefinition;
    title: string;
    href: string;
    linkText?: string;
    className?: string;
}

const SocialIcon = ({ icon, title, href, linkText, className }: SocialIconParams) => {
    return (        
        <a
            className={`h-6 w-6 flex justify-center items-center text-base ${className} hover:bg-gray-1000 hover:bg-none`}
            title={title}
            href={href}
            target="_blank"
            rel="noreferrer"
        >
            <FontAwesomeIcon icon={icon} color="white" />
            {linkText && <span className="ml-2 text-white text-xs font-bold">{linkText}</span>}
        </a>
    )
}

export const SocialIcons = ({ className }) => {
    return (   
        <div className={`flex gap-2 ${className}`}>
            <SocialIcon
                className="bg-youtube w-fit pl-2 pr-2"
                title="Call us"
                href="tel:+61299533000"
                linkText='CALL US'
                icon={faPhone}
            />
            <SocialIcon
                className="bg-youtube"
                title="SSW on YouTube"
                href="https://www.youtube.com/user/sswtechtalks/"
                icon={faYoutube}
            />
            <SocialIcon
                className="bg-linkedin"
                title="SSW on LinkedIn"
                href="https://www.linkedin.com/company/ssw/"
                icon={faLinkedinIn}
            />
            <SocialIcon
                className="bg-facebook"
                title="SSW on Facebook"
                href="https://www.facebook.com/SSW.page"
                icon={faFacebookF}
            />
            <SocialIcon
                className="bg-instagram"
                title="SSW on Instagram"
                href="https://www.instagram.com/ssw_tv"
                icon={faInstagram}
            />
            <SocialIcon
                className="bg-twitter"
                title="SSW on Twitter"
                href="https://twitter.com/SSW_TV"
                icon={faTwitter}
            />
            <SocialIcon
                className="bg-tiktok"
                title="SSW on TikTok"
                href="https://www.tiktok.com/@ssw_tv"
                icon={faTiktok}
            />
        </div>
    );
}