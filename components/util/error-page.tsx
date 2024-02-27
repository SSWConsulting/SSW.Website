import classNames from "classnames";
import { NavMenuGroup } from "ssw.megamenu";
import { CustomLink } from "../customLink";
import { Layout } from "../layout";
import { Container } from "./container";

type ErrorPageProps = {
  menu?: {
    menuGroups: NavMenuGroup[];
  };
  code?: string;
  tipText?: React.ReactNode;
};

export const ErrorPage = (props: ErrorPageProps) => {
  return (
    <Layout menu={props.menu || { menuGroups: [] }}>
      <Container
        width="large"
        size="custom"
        className={classNames(
          "w-full",
          "select-none",
          "bg-[url('/images/404/broken-chain.png')] bg-center bg-no-repeat sm:bg-bottom"
        )}
      >
        <div className="flex min-h-screen-4/5 flex-col sm:flex-row">
          <div className="px-7 pt-7">
            <p className="text-center">
              <span className="font-sans text-9xl font-extrabold leading-none text-sswRed">
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

          <div className="hidden grow sm:block"></div>

          <div className="py-12">
            <span className="font-sans text-3xl font-extralight text-gray-650 sm:text-5xl">
              {props.tipText || "We're sorry, but something went wrong."}
            </span>
          </div>
        </div>
      </Container>
    </Layout>
  );
};
