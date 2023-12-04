import Image from "next/image";
import React from "react";

export type LogoSize = "small" | "medium" | "large";

const Logo: React.FC = () => {
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
        className="h-full"
        priority
      />
      <span className="sr-only">SSW</span>
    </>
  );
};

export default Logo;
