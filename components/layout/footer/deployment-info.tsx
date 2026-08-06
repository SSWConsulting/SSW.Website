import { CustomLink } from "@/components/customLink";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";

// Extended here rather than in app/layout.tsx on purpose. The previous version
// of this component relied on the layout extending `relativeTime`, so when the
// component was removed in #4827 the plugin looked unused and was stripped in
// #4925 — leaving `.fromNow()` primed to throw if anyone restored it (see the
// original fix in #926). Owning the dependency locally keeps the two together.
// dayjs.extend is idempotent, so re-extending is safe.
dayjs.extend(relativeTime);
dayjs.extend(utc);

const buildDate = process.env.NEXT_PUBLIC_GITHUB_RUN_DATE;
const commitHash = process.env.NEXT_PUBLIC_GITHUB_SHA;
const repo = process.env.NEXT_PUBLIC_GITHUB_REPOSITORY;

export const DeploymentInfo = ({ className }: { className?: string }) => {
  const d = buildDate ? dayjs.utc(buildDate) : null;
  const relative = d ? d.fromNow() : null;
  const exact = d ? d.format("D MMM YYYY [at] HH:mm UTC") : undefined;

  return (
    // text-pretty keeps the last line from collapsing to a single orphan word,
    // which this sentence is prone to since its length shifts with the relative
    // build time ("2 days ago" vs "about a minute ago").
    <div className={cn("text-pretty text-gray-400", className)}>
      This website is under{" "}
      <CustomLink
        href="https://www.ssw.com.au/rules/rules-to-better-websites-deployment"
        className="font-medium text-gray-300 transition-colors hover:text-white"
      >
        continuous deployment
      </CustomLink>
      {relative && (
        <>
          . Last updated{" "}
          {/* Native title attribute rather than a positioned tooltip element —
              the old custom tooltip caused horizontal overflow on mobile (#4826). */}
          <span className="cursor-help font-medium text-gray-300" title={exact}>
            {relative}
          </span>
        </>
      )}
      {commitHash && repo && (
        <>
          . Last commit{" "}
          <CustomLink
            href={`https://github.com/${repo}/commit/${commitHash}`}
            target="_blank"
            className="unstyled font-medium text-gray-300 transition-colors hover:text-white"
          >
            {commitHash.slice(0, 7)}
          </CustomLink>
        </>
      )}
      .
    </div>
  );
};
