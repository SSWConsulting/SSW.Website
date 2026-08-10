import footerData from "@/content/footer/index.json";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { CustomLink } from "../../customLink";
import { SocialIcons } from "../../socialIcons/socialIcons";
import { Container } from "../../util/container";
import { DeploymentInfo } from "./deploymentInfo";
import { PoweredByCredits } from "./poweredByCredits";

const MAX_COLUMNS = 5;

export const Footer = () => {
  const { linkColumns, bottomBar } = footerData;
  const columns = (linkColumns ?? []).slice(0, MAX_COLUMNS);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="no-print w-full bg-sswBorder text-gray-300">
      {/* pb is small by design: the deployment band below closes the footer. */}
      <Container width="large" size="custom" className="pb-6 pt-17">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          {/* w-fit stops the anchor stretching the full column width on
              mobile, making dead space either side of the logo clickable. */}
          <CustomLink href="/" className="unstyled w-fit">
            <Image
              src="/images/ssw-logo-darkmode.svg"
              alt="SSW Enterprise Software Development"
              width={332}
              height={98}
              className="h-auto w-56"
            />
          </CustomLink>
          <SocialIcons variant="plain" className="grow-0 md:justify-end" />
        </div>

        <hr className="my-2 h-px border-gray-700 md:my-8" />

        <div className="md:hidden">
          {columns.map((column, index) => (
            <details
              key={(column.title ?? "") + index}
              /* eslint-disable-next-line tailwindcss/no-arbitrary-value, tailwindcss/no-unnecessary-arbitrary-value -- intentional 1px bottom border */
              className="group border-b-[1px] border-gray-700"
            >
              {/* Symmetric py-6 gives the whole row a large tap target; the
                  gap tightens once open so the heading attaches to its list. */}
              <summary className="flex cursor-pointer list-none items-center justify-between py-6 text-sm font-semibold uppercase tracking-widest text-white group-open:pb-4 [&::-webkit-details-marker]:hidden">
                <span>{column.title}</span>
                <ChevronDown
                  aria-hidden="true"
                  className="size-5 shrink-0 transition-opacity duration-200 group-open:hidden"
                />
                <ChevronUp
                  aria-hidden="true"
                  className="hidden size-5 shrink-0 transition-opacity duration-200 group-open:block"
                />
              </summary>
              <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-300 ease-out group-open:max-h-96 group-open:opacity-100">
                <ul className="space-y-3 pb-6">
                  {column.links?.map((link, linkIndex) => (
                    <li key={(link.url ?? "") + linkIndex}>
                      <CustomLink
                        href={link.url}
                        className="unstyled text-gray-300 transition-colors hover:text-white"
                      >
                        {link.label}
                      </CustomLink>
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          ))}
        </div>

        <div className="hidden gap-8 md:grid md:grid-cols-3 lg:grid-cols-5">
          {columns.map((column, index) => (
            <div key={(column.title ?? "") + index}>
              {/* mt-0 overrides the global `h3 { mt-2.5 }` in styles.css. */}
              <h3 className="mb-2 mt-0 text-sm font-semibold text-white">
                {column.title}
              </h3>
              <ul>
                {column.links?.map((link, linkIndex) => (
                  <li key={(link.url ?? "") + linkIndex} className="py-2">
                    <CustomLink
                      href={link.url}
                      className="unstyled relative inline-block text-xs text-white after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-sswRed after:transition-all after:duration-300 hover:after:w-full"
                    >
                      {link.label}
                    </CustomLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* mb matches the Container's pb-6, centring the credits row. */}
        <hr className="my-2 hidden h-px border-gray-700 md:mb-6 md:mt-8 md:block" />

        {/* mt-10 on mobile: the divider above is desktop-only, so without it
            the bottom bar crowds the link accordion (SSW.Website#4849). */}
        <div className="mt-10 flex flex-col gap-4 text-xs text-gray-400 md:mt-0 md:flex-row md:items-center md:justify-between">
          <span>
            &copy; {currentYear} {bottomBar?.copyrightText}
          </span>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {bottomBar?.links?.map((link, index) => (
              <CustomLink
                key={(link.url ?? "") + index}
                href={link.url}
                className="transition-colors hover:text-white"
              >
                {link.label}
              </CustomLink>
            ))}
          </div>
        </div>
      </Container>

      {/* Outside the Container so the darker band runs full-bleed. */}
      <div className="w-full bg-black/30">
        <Container width="large" size="custom" className="py-4">
          {/* Folds intrinsically, not on a breakpoint: `poweredBy` is
              CMS-editable, so the credits' width isn't knowable here. */}
          <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 text-xs">
            <DeploymentInfo className="min-w-0 grow basis-128" />
            <PoweredByCredits items={bottomBar?.poweredBy} />
          </div>
        </Container>
      </div>
    </footer>
  );
};
