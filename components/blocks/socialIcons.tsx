import React from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faYoutube,
    faLinkedinIn,
    faFacebookF,
    faInstagram,
    faTwitter,
    faTiktok,
} from '@fortawesome/free-brands-svg-icons';

const SocialIcon = ({ icon, title, href, className }) => {
    return (        
        <a
            className={`w-9 h-9 flex justify-center items-center hover:bg-gray-900 hover:bg-none ${className}`}
            title={title}
            href={href}
            target="_blank"
            rel="noreferrer"
        >
            <FontAwesomeIcon size="2x" icon={icon} color="white" />
        </a>
    )
}

export const SocialIcons = ({ className }) => {
    return (   
        <div className={`flex gap-4 ${className}`}>
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