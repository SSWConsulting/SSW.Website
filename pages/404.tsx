import { ErrorPage } from "@/components/util/error-page";
import { InferGetStaticPropsType } from "next";
import client from "../.tina/__generated__/client";

export default function FourOhFour(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <ErrorPage
      code="404"
      menu={props.data.megamenu}
      title="PAGE NOT FOUND!"
      tipText={
        <>Sorry, we couldn&apos;t find the page you were looking for...</>
      }
    />
  );
}

export const getStaticProps = async () => {
  const tinaProps = await client.queries.layoutQuery();

  return {
    props: tinaProps,
  };
};
