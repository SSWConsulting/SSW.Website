import { ErrorPage } from "@/components/util/error-page";
import { InferGetStaticPropsType } from "next";
import client from "../.tina/__generated__/client";

export default function FourOhFour(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <ErrorPage
      code="500"
      menu={props.data.megamenu}
      tipText={
        <>
          INTERNAL SERVER ERROR!
          <br />
          We&apos;re sorry, but something went wrong.
        </>
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
