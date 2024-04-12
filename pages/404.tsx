import { Layout } from "@/components/layout";
import { ErrorPage } from "@/components/util/error-page";
import client from "@/tina/client";
import { InferGetStaticPropsType } from "next";

export default function FourOhFour(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <Layout menu={props.data.megamenu}>
      <ErrorPage
        code="404"
        title="PAGE NOT FOUND!"
        tipText={
          <>Sorry, we couldn&apos;t find the page you were looking for...</>
        }
      />
    </Layout>
  );
}

export const getStaticProps = async () => {
  const tinaProps = await client.queries.layoutQuery();

  return {
    props: tinaProps,
  };
};
