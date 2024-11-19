import dayjs from "dayjs";
import { CustomLink } from "../customLink";

const DeploymentLink = () => {
  const deploymentDate = process.env.NEXT_PUBLIC_GITHUB_RUN_DATE
    ? dayjs.utc(process.env.NEXT_PUBLIC_GITHUB_RUN_DATE).fromNow()
    : "XXX";
  const deploymentNumber = process.env.NEXT_PUBLIC_GITHUB_RUN_NUMBER || "XXX";
  const repo = process.env.NEXT_PUBLIC_GITHUB_REPOSITORY;
  const runId = process.env.NEXT_PUBLIC_GITHUB_RUN_ID;
  return (
    <span>
      Last deployed {deploymentDate} (Build #{" "}
      <CustomLink
        href={`https://github.com/${repo}/actions/runs/${runId}`}
        target="_blank"
      >
        {deploymentNumber}
      </CustomLink>
      )
    </span>
  );
};

export default DeploymentLink;
