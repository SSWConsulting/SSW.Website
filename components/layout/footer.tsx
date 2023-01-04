import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "../util/container";
import { SocialIcons } from "../util/socialIcons";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white text-xxs">
      <Container className="relative" size="xsmall">
        <CopyrightInfo />
        <SocialIcons className="my-4 justify-center lg:hidden" />
        <DeploymentInfo />
      </Container>
    </footer>
  );
};

const Divider = () => (
  <span className="px-2">|</span>
)

const CopyrightInfo = () => (
  <div className="flex justify-between items-center gap-6 flex-wrap">
    <div>
      &copy; Copyright SSW 1990-{new Date().getFullYear()}. All Rights Reserved.
    </div>
    <div>
      <Link
        href="https://github.com/SSWConsulting/SSW.Rules/issues/new/choose"
        target="_blank"
      >
        FEEDBACK TO SSW
      </Link>
      <Divider />
      <Link href="/ssw/Standards/Forms/ConsultingOrderTermsConditions.aspx">
        TERMS AND CONDITIONS
      </Link>
    </div>
  </div>
)

const DeploymentInfo = () => (
  <div className="flex justify-between items-center gap-6 flex-wrap">
    <div>
      Our website is under{" "}
      <Link
        href="https://www.ssw.com.au/rules/rules-to-better-websites-deployment"
      >
        CONSTANT CONTINUOUS DEPLOYMENT
      </Link>
      . Last deployed {"XXX"}{" "}
      {process.env.GITHUB_RUN_NUMBER && (
        <span>
          (Build #{" "}
          <Link
            href={`https://github.com/SSWConsulting/SSW.Website/actions/runs/${process.env.GITHUB_RUN_ID}`}
            target="_blank"
          >
            {process.env.GITHUB_RUN_NUMBER}
          </Link>
          )
        </span>
      )}
    </div>
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
            width={40} />
        </a>
      </Link>
    </div>
  </div>
)