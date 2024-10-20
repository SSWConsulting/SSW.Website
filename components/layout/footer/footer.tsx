import dynamic from "next/dynamic";
import { Container } from "../../util/container";
import { CopyrightInfo } from "./copyright-info";
import { DeploymentInfo } from "./deployment-info";

const SocialIcons = dynamic(
  () => import("../../socialIcons/socialIcons").then((x) => x.SocialIcons),
  { ssr: false }
);

const SiteInfo = dynamic(() => import("./site-info").then((x) => x.SiteInfo), {
  ssr: false,
});

export const Footer = () => {
  return (
    <footer className="no-print w-full bg-ssw-black text-xxs text-gray-300">
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
      </Container>
    </footer>
  );
};
