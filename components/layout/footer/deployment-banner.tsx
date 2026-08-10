import { CustomLink } from "@/components/customLink";
import { Container } from "@/components/util/container";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import Image from "next/image";

dayjs.extend(utc);
dayjs.extend(relativeTime);

const DEPLOYMENT_RULE_URL =
  "https://www.ssw.com.au/rules/rules-to-better-websites-deployment";

const buildDate = process.env.NEXT_PUBLIC_GITHUB_RUN_DATE;
const commitHash = process.env.NEXT_PUBLIC_GITHUB_SHA;
const repo = process.env.NEXT_PUBLIC_GITHUB_REPOSITORY;

type PoweredByItem = {
  label?: string | null;
  url?: string | null;
  icon?: string | null;
};

type DeploymentBannerProps = {
  poweredBy?: PoweredByItem[] | null;
};

export const DeploymentBanner = ({ poweredBy }: DeploymentBannerProps) => {
  const build = buildDate ? dayjs.utc(buildDate) : null;

  return (
    <div className="bg-sswDarkGray text-xs text-gray-400">
      <Container
        width="large"
        size="custom"
        className="flex flex-col items-center gap-4 py-4 md:flex-row md:justify-between"
      >
        <p className="text-center md:text-left">
          This website is under{" "}
          <CustomLink
            href={DEPLOYMENT_RULE_URL}
            className="unstyled font-medium text-gray-100 underline underline-offset-2 transition-colors hover:text-white"
          >
            continuous deployment
          </CustomLink>
          {build && (
            <>
              {". Last updated "}
              <span
                className="cursor-help font-medium text-gray-100"
                title={`Last updated ${build.format("D MMM YYYY [at] HH:mm UTC")}`}
              >
                {build.fromNow()}
              </span>
            </>
          )}
          {commitHash && repo && (
            <>
              {". Last commit "}
              <CustomLink
                href={`https://github.com/${repo}/commit/${commitHash}`}
                className="unstyled font-medium text-gray-100 transition-colors hover:text-white"
              >
                {commitHash.slice(0, 7)}
              </CustomLink>
            </>
          )}
          .
        </p>

        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {poweredBy?.map((item, index) => {
            const content = (
              <>
                {item.icon && (
                  <Image
                    src={item.icon}
                    alt=""
                    width={16}
                    height={16}
                    className="size-4 shrink-0"
                  />
                )}
                <span className="font-semibold uppercase tracking-wider">
                  {item.label}
                </span>
              </>
            );

            return (
              <li
                key={(item.url ?? item.label ?? "") + index}
                className="flex items-center gap-1"
              >
                {item.url ? (
                  <CustomLink
                    href={item.url}
                    className="unstyled flex items-center gap-1 transition-colors hover:text-white"
                  >
                    {content}
                  </CustomLink>
                ) : (
                  content
                )}
              </li>
            );
          })}
        </ul>
      </Container>
    </div>
  );
};
