import classNames from "classnames";
import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import client from "../.tina/__generated__/client";
import { Layout } from "../components/layout";
import { Container } from "../components/util/container";

export default function FourOhFour(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <Layout menu={props.data.megamenu.menuGroups}>
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
                404
              </span>
            </p>

            <div className="mx-auto">
              <div className="my-4 bg-gray-200 px-5 py-4">
                Visit{" "}
                <Link href="/" className="text-sswRed no-underline">
                  SSW homepage
                </Link>{" "}
                to find out how we can help you.
              </div>

              <div className="my-4 bg-gray-200 px-5 py-4">
                Learn more about{" "}
                <Link
                  href="/rules/404-useful-error-page"
                  className="text-sswRed no-underline"
                >
                  having a useful 404 error page
                </Link>
                .
              </div>
            </div>
          </div>

          <div className="hidden grow sm:block"></div>

          <div className="py-12">
            <span className="font-sans text-3xl font-extralight text-gray-650 sm:text-5xl">
              PAGE NOT FOUND!
              <br />
              Sorry, we couldn&apos;t find the page you were looking for...
            </span>
          </div>
        </div>
      </Container>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const tinaProps = await client.queries.layoutQuery();

  return {
    props: tinaProps,
  };
};
