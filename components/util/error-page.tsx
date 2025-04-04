import classNames from "classnames";
import { CustomLink } from "../customLink";
import { Container } from "./container";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import React from "react";
import { BiChevronRight } from "react-icons/bi";
import { FaXmark } from "react-icons/fa6";
import { LiveStreamData } from "../layout/layout";

//TODO: consolidate all of the error components into one https://github.com/SSWConsulting/SSW.Website/issues/3350

export type ErrorPageProps = {
  code?: string;
  title?: string;
  tipText?: React.ReactNode;
  details?: string;
  exitButtonCallback?: () => void;
  userGroup?: LiveStreamData;
};

export const ErrorPage = (props: ErrorPageProps) => {
  return (
    <Container
      width="large"
      size="custom"
      className={classNames(
        "w-full",
        "select-none",
        "bg-errorPage bg-center bg-no-repeat md:bg-bottom"
      )}
    >
      <div className="flex min-h-screen-4/5 flex-col md:flex-row md:gap-7 lg:gap-14">
        <div className="md:pt-7">
          <p className="text-center">
            <span className="font-sans text-8xl font-extrabold leading-none text-sswRed sm:text-9xl">
              {props.code || "Error"}
            </span>
          </p>

          <div className="mx-auto">
            <div className="my-4 bg-gray-200 px-5 py-4">
              Visit{" "}
              <CustomLink href="/" className="text-sswRed no-underline">
                SSW homepage
              </CustomLink>{" "}
              to find out how we can help you.
            </div>

            {props.code === "404" && (
              <div className="my-4 bg-gray-200 px-5 py-4">
                Learn more about{" "}
                <CustomLink
                  href="/rules/404-useful-error-page"
                  className="text-sswRed no-underline"
                >
                  having a useful 404 error page
                </CustomLink>
                .
              </div>
            )}
          </div>
        </div>

        <div className="hidden grow md:block"></div>

        <ErrorText
          title={props.title}
          tipText={props.tipText}
          details={props.details}
          exitButtonCallback={props.exitButtonCallback}
        />
      </div>
    </Container>
  );
};

type ErrorTextProps = {
  title?: string;
  tipText?: React.ReactNode;
  details?: string;
  exitButtonCallback?: () => void;
};

export const ErrorText = (props: ErrorTextProps) => {
  return (
    <div className="overflow-x-hidden py-4 md:py-12">
      {props.exitButtonCallback && (
        <div className="flex justify-end">
          <button
            className="rounded-full p-2 hover:bg-gray-200"
            onClick={props.exitButtonCallback}
          >
            <FaXmark className="size-6 text-gray-500" />
          </button>
        </div>
      )}
      <span
        className="font-sans font-extralight text-gray-650"
        style={{ wordBreak: "break-word" }}
      >
        <h1 className="mt-0 pb-1 pt-0 text-3xl sm:text-5xl">
          {props.title || "We're sorry, something has gone wrong here."}
        </h1>
        {props.tipText || (
          <div>
            <p className="pt-4">
              For help, please submit a bug report issue on our GitHub at{" "}
              <a href="https://github.com/SSWConsulting/SSW.Website/issues/new/choose">
                github.com/SSWConsulting/SSW.Website
              </a>{" "}
              or send us an email at{" "}
              <a href="mailto:info@ssw.com.au">info@ssw.com.au</a>.
            </p>
          </div>
        )}
      </span>
      {props.details && (
        <div className="min-h-40">
          <Disclosure>
            {({ open }) => (
              <div>
                <DisclosureButton className={"mt-5"}>
                  <div className="flex flex-row items-center font-extralight text-gray-650">
                    See details{" "}
                    <BiChevronRight className={open ? "rotate-90" : ""} />
                  </div>
                </DisclosureButton>
                <DisclosurePanel className={"overflow-x-auto"}>
                  <pre>
                    <code>{props.details}</code>
                  </pre>
                </DisclosurePanel>
              </div>
            )}
          </Disclosure>
        </div>
      )}
    </div>
  );
};
