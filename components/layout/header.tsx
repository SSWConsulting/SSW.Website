import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Container } from "../util/container";
import { SocialIcons } from "../util/socialIcons";

export const Header = () => {
  const router = useRouter();

  // If we're on an admin path, other links should also link to their admin paths
  const [prefix, setPrefix] = React.useState("");

  React.useEffect(() => {
    if (window && window.location.pathname.startsWith("/admin")) {
      setPrefix("/admin");
    }
  }, []);

  return (
    <div className={`relative overflow-hidden bg-gradient-to-b`}>
      <Container size="custom" className="py-0 relative z-10 max-w-8xl my-4">
        <div className="flex justify-between items-center">
          <Logo />
          <SocialIcons/>
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
    <h4 className="flex items-center">
      <Link href="/" passHref>
        <a className="flex gap-1 items-center whitespace-nowrap tracking-[.002em]">
          <img src={logoPath} alt="SSW - Enterprise Software Development" />
        </a>
      </Link>
      <div className="w-24 ml-4 text-xxs leading-3 uppercase text-gray-700 font-thin">
        Enterprise Software Development
      </div>
    </h4>
  );
};
