import { CustomLink } from "../customLink";

const DeploymentLink = ({ deploymentDate, repo, runId, deploymentNumber }) => {
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
