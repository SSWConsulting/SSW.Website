import { Layout } from "../../components/layout";
import { client } from "../../.tina/__generated__/client";
import { useTina } from "tinacms/dist/react";

export default function OfficeIndex(
  props: AsyncReturnType<typeof getStaticProps>["props"]
) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  return (
    <Layout>
      <div className="mx-auto max-w-9xl px-6 sm:px-8">
        {data.officesConnection.edges.map(edge => <h2>{`${edge.node.addressLocality} | ${edge.node.addressCountry}`}</h2>)}
      </div>
    </Layout>
  );
}

export const getStaticProps = async ({ params }) => {
  const tinaProps = await client.queries.officesConnection();

  console.log(tinaProps.data.officesConnection.edges);

  return { 
    props: {
      data: tinaProps.data,
      query: tinaProps.query,
      variables: tinaProps.variables
    }
  };
}

export type AsyncReturnType<T extends (...args: any) => Promise<any>> = // eslint-disable-line @typescript-eslint/no-explicit-any
  T extends (...args: any) => Promise<infer R> ? R : any; // eslint-disable-line @typescript-eslint/no-explicit-any
