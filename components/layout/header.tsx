import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "../util/container";
import { SocialIcons, SocialTypes } from "../util/socialIcons";
import { LiveStreamBanner } from "../liveStreamBanner";

export const Header = () => {

  // all SocialType values except phone
  const excludeMobile = Object.values(SocialTypes).filter(
    (type) => type !== SocialTypes.phone
  );

  return (
    <div className={"relative overflow-hidden bg-gradient-to-b"}>
      <LiveStreamBanner/>
      <Container width="custom" size="custom" className="relative z-10 my-4 max-w-9xl py-0">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Logo />
          <div className="mt-4 flex items-center justify-center sm:mt-0">
            <SocialIcons excludeMobile={excludeMobile}/>
          </div>
        </div>
      </Container>
    </div>
  );
};

const Logo = () => {
  // show the xmas logo for 1-25 December
  const date = new Date();
  const isXmas = date.getMonth() === 11 && date.getDate() <= 25;
  const logoPath = isXmas
    ? "/images/ssw-logo-xmas.svg"
    : "/images/ssw-logo.svg";

  return (
    <h4 className="flex items-center justify-center">
      <Link href="/" passHref>
        <a className="flex items-center gap-1 whitespace-nowrap">
          <Image
            src={logoPath}
            alt="SSW - Enterprise Software Development"
            height={60}
            width={90} />
        </a>
      </Link>
      <div className="ml-4 w-24 text-xxs font-thin uppercase leading-3 text-gray-700">
        Enterprise Software Development
      </div>
    </h4>
  );
};
