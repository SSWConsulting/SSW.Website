// import client from "../.tina/__generated__/client";
import { InferGetStaticPropsType } from "next";
import { useTina } from "tinacms/dist/react";
import client from "../.tina/__generated__/client";
import { Layout } from "../components/layout";

const LivePage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { data } = useTina({
    data: props.data,
    query: props.query,
    variables: props.variables,
  });

  console.log(data);

  return (
    <Layout className="bg-gray-75">
      <div className="!max-w-full !bg-white">
        <span className="text-sswRed">
          <h2>Upcoming session Details</h2>
        </span>
      </div>
    </Layout>
  );
};

export const getStaticProps = async () => {
  const tinaProps = await client.queries.liveConnection();

  return {
    props: {
      data: tinaProps.data,
      query: tinaProps.query,
      variables: tinaProps.variables,
    },
  };
};

export default LivePage;
