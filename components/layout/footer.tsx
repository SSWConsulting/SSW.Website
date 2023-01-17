import React from "react";
import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { Container } from "../util/container";
import { SocialIcons } from "../util/socialIcons";

dayjs.extend(timezone);
dayjs.extend(utc);

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-xxs text-white">
      <Container className="relative" size="xsmall">
        <div className="flex flex-wrap items-center justify-center gap-6 sm:justify-between">
          <CopyrightInfo />
        </div>
        <SocialIcons className="my-6 justify-center sm:my-4 sm:hidden" />
        <div className="flex flex-wrap items-center justify-center gap-6 sm:justify-between">
          <DeploymentInfo />
          <SiteInfo />
        </div>
      </Container>
    </footer>
  );
};

const Divider = () => <span className="px-2">|</span>;

const CopyrightInfo = () => (
  <>
    <div>
      &copy; Copyright SSW 1990-{new Date().getFullYear()}. All Rights Reserved.
    </div>
    <div>
      <Link
        href="https://github.com/SSWConsulting/SSW.Website-v3/issues/new/choose"
        target="_blank"
      >
        FEEDBACK TO SSW
      </Link>
      <Divider />
      <Link href="/ssw/Standards/Forms/ConsultingOrderTermsConditions.aspx">
        TERMS AND CONDITIONS
      </Link>
    </div>
  </>
);

const DeploymentInfo = () => (
  <div className="text-center sm:text-left">
    Our website is under{" "}
    <Link href="https://www.ssw.com.au/rules/rules-to-better-websites-deployment">
      CONSTANT CONTINUOUS DEPLOYMENT
    </Link>
    . <LinkToDeployment />
  </div>
);

const LinkToDeployment = () => {
  const deploymentDate = process.env.NEXT_PUBLIC_GITHUB_RUN_DATE ? dayjs.utc(process.env.NEXT_PUBLIC_GITHUB_RUN_DATE).fromNow() : "XXX";
  const deploymentNumber = process.env.NEXT_PUBLIC_GITHUB_RUN_NUMBER || "XXX";

  return (
    <span>
      Last deployed {deploymentDate} (Build #{" "}
      <Link
        href={`https://github.com/${process.env.NEXT_PUBLIC_GITHUB_REPOSITORY}/actions/runs/${process.env.NEXT_PUBLIC_GITHUB_RUN_ID}`}
        target="_blank"
      >
        <a>{deploymentNumber}</a>
      </Link>
      )
    </span>
  );
};

const SiteInfo = () => (
  <div>
    <Link
      // TODO: Implementation
      href="https://www.ssw.com.au/ssw/MenuMap.aspx"
    >
      SITEMAP
    </Link>
    <Divider />
    <Link
      // TODO: Implementation
      href="https://www.ssw.com.au/ssw/HealthCheck"
    >
      <a>
        HEALTH CHECK
        <Image
          src="/images/health-check.png"
          alt="health check logo"
          height={14}
          width={40}
        />
      </a>
    </Link>
  </div>
);
