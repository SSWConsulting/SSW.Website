import { CustomLink } from "@/components/customLink";
import { RelativeTime } from "./relative-time";

const commitHash = process.env.NEXT_PUBLIC_GITHUB_SHA?.slice(0, 7);
const repo = process.env.NEXT_PUBLIC_GITHUB_REPOSITORY;

export const DeploymentInfo = () => {
  return (
    <div className="text-center sm:text-left">
      This website is under{" "}
      <CustomLink
        href="https://www.ssw.com.au/rules/rules-to-better-websites-deployment"
        className="text-white hover:text-ssw-red transition-colors duration-300 ease-in-out"
      >
        continuous deployment
      </CustomLink>
      . Last updated{" "}
      <RelativeTime buildDate={process.env.NEXT_PUBLIC_GITHUB_RUN_DATE} />
      {commitHash && repo && (
        <>
          . Last commit{" "}
          <CustomLink
            href={`https://github.com/${repo}/commit/${commitHash}`}
            target="_blank"
            className="text-white hover:text-ssw-red transition-colors duration-300 ease-in-out"
          >
            {commitHash}
          </CustomLink>
        </>
      )}
    </div>
  );
};
