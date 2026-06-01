import { CustomLink } from "@/components/customLink";
import dayjs from "dayjs";

const buildDate = process.env.NEXT_PUBLIC_GITHUB_RUN_DATE;
const commitHash = process.env.NEXT_PUBLIC_GITHUB_SHA;
const repo = process.env.NEXT_PUBLIC_GITHUB_REPOSITORY;

export const DeploymentInfo = () => {
  const d = buildDate ? dayjs.utc(buildDate) : null;
  const relative = d ? d.fromNow() : "XXX";
  const tooltip = d
    ? `Last updated ${d.format("D MMM YYYY [at] HH:mm UTC")}`
    : undefined;

  return (
    <div className="text-center sm:text-left">
      This website is under{" "}
      <CustomLink
        href="https://www.ssw.com.au/rules/rules-to-better-websites-deployment"
        className="transition-colors hover:text-ssw-red"
      >
        continuous deployment
      </CustomLink>
      . Last updated{" "}
      <span
        className="group relative inline-block cursor-help transition-colors hover:text-ssw-red"
        title={tooltip}
      >
        {relative}
        {tooltip && (
          <span
            role="tooltip"
            className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1 -translate-x-1/2 whitespace-nowrap rounded bg-white px-2 py-1 text-xs leading-none text-gray-900 opacity-0 shadow-md transition-opacity duration-150 group-hover:opacity-100"
          >
            {tooltip}
          </span>
        )}
      </span>
      {commitHash && repo && (
        <>
          . Last commit{" "}
          <CustomLink
            href={`https://github.com/${repo}/commit/${commitHash}`}
            target="_blank"
            className="transition-colors hover:text-ssw-red"
          >
            {commitHash.slice(0, 7)}
          </CustomLink>
        </>
      )}
    </div>
  );
};
