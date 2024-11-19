import { SocialIcons } from "@/components/socialIcons/socialIcons";
import { Container } from "@/components/util/container";
import { CopyrightInfo } from "./copyright-info";
import { DeploymentInfo } from "./deployment-info";
import { SiteInfo } from "./site-info";

const ErrorFooter = () => {
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

export default ErrorFooter;
