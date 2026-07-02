import footerData from "@/content/footer/index.json";
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
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <div className="flex items-center gap-4">
            <Image
              src="/images/ssw-logo-darkmode.svg"
              alt="SSW Enterprise Software Development"
              width={332}
              height={98}
              className="h-auto w-56"
            />
          </div>
          <SocialIcons
            variant="plain"
            className="grow-0 justify-center md:justify-end"
          />
        </div>

        <hr className="my-8 h-px border-gray-700" />

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          {columns.map((column, index) => (
            <div key={(column.title ?? "") + index}>
              <h3 className="mb-4 text-base font-semibold text-white">
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

        <hr className="my-8 h-px border-gray-700" />

        <div className="flex flex-col gap-4 text-sm md:flex-row md:items-center md:justify-between">
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
