import { CustomLink } from "@/components/customLink";
import dayjs from "dayjs";

import dynamic from "next/dynamic";

export const DeploymentInfo = () => {
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

  const DynamicDeploymentLink = dynamic(() => import("../deploymentLink"));

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
