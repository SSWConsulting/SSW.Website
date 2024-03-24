import dayjs from "dayjs";
import dynamic from "next/dynamic";
import Image from "next/image";
import { BuiltOnAzure } from "../blocks";
import { CustomLink } from "../customLink";
import { SocialIcons } from "../socialIcons/socialIcons";
import { Container } from "../util/container";
import { Section } from "../util/section";

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

const Divider = () => <span className="px-2">|</span>;

const CopyrightInfo = () => {
  const chooseIssueURL = `https://github.com/${process.env.NEXT_PUBLIC_GITHUB_REPOSITORY}/issues/new/choose`;
  return (
    <>
      <div>
        &copy; 1990-{new Date().getFullYear()} SSW. All rights reserved.
      </div>
      <div className="text-center">
        <CustomLink href={chooseIssueURL}>FEEDBACK TO SSW</CustomLink>
        <Divider />
        <CustomLink href="/terms-and-conditions">
          TERMS AND CONDITIONS
        </CustomLink>
        <Divider />
        <CustomLink href="/privacy">PRIVACY</CustomLink>
      </div>
    </>
  );
};

const DeploymentInfo = () => {
  const deploymentDate = process.env.NEXT_PUBLIC_GITHUB_RUN_DATE
    ? dayjs.utc(process.env.NEXT_PUBLIC_GITHUB_RUN_DATE).fromNow()
    : "XXX";
  const deploymentNumber = process.env.NEXT_PUBLIC_GITHUB_RUN_NUMBER || "XXX";

  const deploymentLinkInfo = {
    deploymentDate,
    repo: process.env.NEXT_PUBLIC_GITHUB_REPOSITORY,
    runId: process.env.NEXT_PUBLIC_GITHUB_RUN_ID,
    deploymentNumber,
  };

  const DynamicDeploymentLink = dynamic(() => import("./deploymentLink"), {
    ssr: false,
  });

  return (
    <div className="text-center sm:text-left">
      This website is under{" "}
      <CustomLink href="https://www.ssw.com.au/rules/rules-to-better-websites-deployment">
        CONSTANT CONTINUOUS DEPLOYMENT
      </CustomLink>
      .&nbsp;
      <DynamicDeploymentLink {...deploymentLinkInfo} />
    </div>
  );
};

const SiteInfo = () => (
  <div>
    <CustomLink
      // TODO: Implementation
      href="https://www.ssw.com.au/ssw/MenuMap.aspx"
    >
      SITEMAP
    </CustomLink>
    <Divider />
    <CustomLink
      // TODO: Implementation
      href="https://www.ssw.com.au/ssw/HealthCheck"
    >
      HEALTH CHECK
      <Image
        src="/images/health-check.png"
        alt="health check logo"
        height={14}
        width={40}
        className="inline-block pb-1 pl-2"
      />
    </CustomLink>
  </div>
);
export const PreFooter = () => {
  return (
    <Section className="w-full flex-none">
      <BuiltOnAzure data={{ backgroundColor: "lightgray" }} />
    </Section>
  );
};
