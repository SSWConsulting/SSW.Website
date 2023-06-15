import Link from "next/link";

const DeploymentLink = ({ deploymentDate, repo, runId, deploymentNumber }) => {
  return (
    <span>
      Last deployed {deploymentDate} (Build #{" "}
      <Link
        href={`https://github.com/${repo}/actions/runs/${runId}`}
        target="_blank"
      >
        {deploymentNumber}
      </Link>
      )
    </span>
  );
};

export default DeploymentLink;
