import { ErrorPage } from "@/components/util/error-page";
import { InferGetStaticPropsType } from "next";
import client from "../.tina/__generated__/client";

export default function FourOhFour(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return <ErrorPage code={404} menu={props.data.megamenu} />;
}

export const getStaticProps = async () => {
  const tinaProps = await client.queries.layoutQuery();

  return {
    props: tinaProps,
  };
};
