import dayjs from "dayjs";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { Container } from "../util/container";
import { SocialIcons, SocialTypes } from "../util/socialIcons";

export const Footer = () => {
  return (
    <footer className="no-print w-full bg-ssw-black text-xxs text-gray-300">
      <Container size="xsmall">
        <SocialIcons
          className="mb-3 mt-2 justify-center"
          excludeDesktop={[SocialTypes.phone]}
          excludeMobile={[SocialTypes.phone, SocialTypes.meetup]}
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
      <div>
        <Link href={chooseIssueURL} target="_blank">
          FEEDBACK TO SSW
        </Link>
        <Divider />
        <Link href="https://www.ssw.com.au/terms-and-conditions">
          TERMS AND CONDITIONS
        </Link>
        <Divider />
        <Link href="https://www.ssw.com.au/privacy">PRIVACY</Link>
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
      <Link
        href="https://www.ssw.com.au/rules/rules-to-better-websites-deployment"
        prefetch={false}
      >
        CONSTANT CONTINUOUS DEPLOYMENT
      </Link>
      .&nbsp;
      <DynamicDeploymentLink {...deploymentLinkInfo} />
    </div>
  );
};

const SiteInfo = () => (
  <div>
    <Link
      // TODO: Implementation
      href="https://www.ssw.com.au/ssw/MenuMap.aspx"
      prefetch={false}
    >
      SITEMAP
    </Link>
    <Divider />
    <Link
      // TODO: Implementation
      href="https://www.ssw.com.au/ssw/HealthCheck"
      prefetch={false}
    >
      HEALTH CHECK
      <Image
        src="/images/health-check.png"
        alt="health check logo"
        height={14}
        width={40}
        className="inline-block pb-1 pl-2"
      />
    </Link>
  </div>
);
