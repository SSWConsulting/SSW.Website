import { Layout } from "@/components/layout";
import { ErrorPage } from "@/components/util/error-page";
import client from "@/tina/client";
import { TODAY } from "hooks/useFetchEvents";
import { InferGetStaticPropsType } from "next";

export default function FourOhFour(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <Layout liveStreamData={props.data.userGroup} menu={props.data.megamenu}>
      <ErrorPage
        userGroup={props.data.userGroup}
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
  const tinaProps = await client.queries.layoutQuery({
    date: TODAY.toISOString(),
  });
  return {
    props: tinaProps,
  };
};
