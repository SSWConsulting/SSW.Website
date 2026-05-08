import dynamic from "next/dynamic";
import { SocialIcons } from "../../socialIcons/socialIcons";
import { Container } from "../../util/container";
import { CopyrightInfo } from "./copyright-info";
import { DeploymentInfo } from "./deployment-info";
import { TechnologyLinks } from "./technology-links";

const SiteInfo = dynamic(() => import("./site-info").then((x) => x.SiteInfo));

export const Footer = () => {
  return (
    <footer className="no-print w-full bg-ssw-black pb-6 text-xxs text-gray-300">
      <Container size="xsmall">
        <SocialIcons
          className="mb-3 mt-2 justify-center"
          excludeMobile={["meetup"]}
        />
        <hr className="my-2 border-gray-800" />
        <div className="flex flex-wrap items-center justify-center gap-6 sm:justify-between">
          <CopyrightInfo />
        </div>
        <hr className="my-2 border-gray-800" />
        <div className="flex flex-wrap items-center justify-center gap-6 sm:justify-between">
          <DeploymentInfo />
          <SiteInfo />
        </div>
        <hr className="my-2 border-gray-800" />
        <TechnologyLinks />
      </Container>
    </footer>
  );
};
