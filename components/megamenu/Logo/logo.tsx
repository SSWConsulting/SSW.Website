import Image from "next/image";
import Link from "next/link";
import React from "react";

export type LogoSize = "small" | "medium" | "large";

export interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  // show the xmas logo for 1-25 December
  const date = new Date();
  const isXmas = date.getMonth() === 11 && date.getDate() <= 25;
  const logoPath = isXmas
    ? "/images/ssw-logo-xmas.svg"
    : "/images/ssw-logo.svg";

  return (
    <>
      <Image
        src={logoPath}
        alt="SSW - Enterprise Software Development"
        height={60}
        width={100}
        className="h-[60px]"
        priority
      />
      <span className="sr-only">SSW</span>
      {/* {isXmas ? (
        <SSWXmasLogo height="100%" width="100%" className={className} />
      ) : (
        <SSWLogo height="100%" width="100%" className={className} />
      )} */}
    </>
  );
};

export default Logo;
