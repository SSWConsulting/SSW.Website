import footerData from "@/content/footer/index.json";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { CustomLink } from "../../customLink";
import { SocialIcons } from "../../socialIcons/socialIcons";
import { Container } from "../../util/container";
import { DeploymentInfo } from "./deployment-info";

const MAX_COLUMNS = 5;

export const Footer = () => {
  const { linkColumns, bottomBar } = footerData;
  const columns = (linkColumns ?? []).slice(0, MAX_COLUMNS);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="no-print w-full bg-sswBorder text-gray-300">
      {/* Bottom padding is deliberately much smaller than the top: the
          deployment band below provides the footer's lower edge, and the
          design leaves only a small gap between the credits row and it. */}
      <Container width="large" size="custom" className="pb-6 pt-17">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          {/* Links home like the masthead logo. w-fit stops the anchor
              stretching to the full flex column width on mobile, which would
              make dead space either side of the logo clickable. */}
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
              {/* Collapsed rows keep a balanced 24px/24px tap target. Once open,
                  the gap down to the first link tightens to 16px so it matches
                  the desktop heading's mb-4 and both layouts read the same. */}
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
              {/* mt-0 overrides the global `h3 { mt-2.5 }` in styles.css, which
                  otherwise adds 10px above every column heading and throws the
                  spacing above/below the headings out of balance. */}
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

        {/* mb matches the Container's pb-6 below the credits row, so the row
            sits with equal space above and below it. */}
        <hr className="my-2 hidden h-px border-gray-700 md:mb-6 md:mt-8 md:block" />

        {/* Copyright and legal links sit at opposite ends of the row.
            mt-10 on mobile: the divider above is desktop-only, so without it
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

      {/* Full-bleed deployment band. Sits outside the Container so the darker
          surface runs edge to edge, with its own inner container keeping the
          content aligned with the footer above. bg-black/30 over the footer's
          #212121 lands on #171717 — the same 30% darkening the design uses. */}
      <div className="w-full bg-black/30">
        <Container width="large" size="custom" className="py-4">
          {/* The row folds intrinsically rather than at a viewport breakpoint.
              `poweredBy` is CMS-editable, so how much room the credits need
              isn't knowable here — flex-wrap plus a basis on the sentence puts
              the two side by side only while both still fit, and drops the
              credits onto their own line the moment they don't. The previous
              `md:flex-row` flipped at 768px, which leaves ~680px of inner
              width against the ~1050px the sentence and credits need side by
              side, so both blocks wrapped into a ragged two-column block from
              768px up. The fold now lands around 1150px, and either side of it
              each block gets its own clean line. */}
          <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 text-xs">
            <DeploymentInfo className="min-w-0 grow basis-128" />
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 uppercase tracking-wider text-gray-400">
              {bottomBar?.poweredBy?.map((item, index) => {
                const content = (
                  <>
                    {item.logo && (
                      <Image
                        src={item.logo}
                        alt=""
                        height={16}
                        width={16}
                        className="size-4 shrink-0 object-contain"
                      />
                    )}
                    <span>{item.label}</span>
                  </>
                );

                // whitespace-nowrap keeps a credit from splitting mid-phrase
                // (or from its logo) when the group wraps; the group's own
                // flex-wrap breaks between credits instead. The widest credit
                // still fits a 320px viewport, so this can't cause overflow.
                // py-1/-my-1 grows the tap target to 27px without moving
                // anything — the text alone is only 18px tall, under the 24px
                // WCAG 2.5.8 minimum.
                const itemClass =
                  "-my-1 flex items-center gap-1.5 whitespace-nowrap py-1";

                return item.url ? (
                  <CustomLink
                    key={(item.url ?? "") + index}
                    href={item.url}
                    className={cn(
                      "unstyled transition-colors hover:text-white",
                      itemClass
                    )}
                  >
                    {content}
                  </CustomLink>
                ) : (
                  <span key={(item.label ?? "") + index} className={itemClass}>
                    {content}
                  </span>
                );
              })}
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
};
