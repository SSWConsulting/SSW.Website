import footerData from "@/content/footer/index.json";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { CustomLink } from "../../customLink";
import { SocialIcons } from "../../socialIcons/socialIcons";
import { Container } from "../../util/container";

const MAX_COLUMNS = 5;

export const Footer = () => {
  const { linkColumns, bottomBar } = footerData;
  const columns = (linkColumns ?? []).slice(0, MAX_COLUMNS);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="no-print w-full bg-sswBorder text-gray-300">
      <Container width="large" size="large">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Image
            src="/images/ssw-logo-darkmode.svg"
            alt="SSW Enterprise Software Development"
            width={332}
            height={98}
            className="h-auto w-56"
          />
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
              <summary className="flex cursor-pointer list-none items-center justify-between py-6 text-sm font-semibold uppercase tracking-widest text-white [&::-webkit-details-marker]:hidden">
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
              <h3 className="mb-4 text-lg font-semibold text-white">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links?.map((link, linkIndex) => (
                  <li key={(link.url ?? "") + linkIndex}>
                    <CustomLink
                      href={link.url}
                      className="unstyled relative inline-block text-gray-300 transition-colors after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-sswRed after:transition-all after:duration-300 hover:text-white hover:after:w-full"
                    >
                      {link.label}
                    </CustomLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-col gap-4 text-sm md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-400">
            <span>
              &copy; {currentYear} {bottomBar?.copyrightText}
            </span>
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
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs uppercase tracking-wider text-gray-500">
            {bottomBar?.poweredBy?.map((item, index) =>
              item.url ? (
                <CustomLink
                  key={(item.url ?? "") + index}
                  href={item.url}
                  className="unstyled transition-colors hover:text-white"
                >
                  {item.label}
                </CustomLink>
              ) : (
                <span key={(item.label ?? "") + index}>{item.label}</span>
              )
            )}
          </div>
        </div>
      </Container>
    </footer>
  );
};
