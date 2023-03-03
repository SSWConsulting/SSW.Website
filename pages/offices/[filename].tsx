import { useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

import { componentRenderer } from "../../components/blocks/mdxComponentRenderer";

import { client } from "../../.tina/__generated__/client";
import { Layout } from "../../components/layout";
import { Container } from "../../components/util/container";

import Image from "next/image";
import OfficesSidebar from "../../components/offices/officesSidebar";

export default function OfficePage(
    props: AsyncReturnType<typeof getStaticProps>["props"]
) {
  const { data } = useTina({
    data: props.data,
    query: props.query,
    variables: props.variables,
  });

  return (
      <Layout>
          <div className="mx-auto max-w-9xl px-6 sm:px-8">
            <div className="h-auto w-auto">
              <Image 
                width={1320}
                height={485}           
                src={data.offices.coverImg}
                alt="Cover image"
              />
            </div>
          </div>
          
          <Container className={"flex-1 pt-4"}>
            <div className="gap-8 md:grid md:grid-cols-7">
              <div className="prose max-w-full prose-h2:text-sswRed prose-h4:text-lg md:col-span-5">
                <TinaMarkdown 
                  components={componentRenderer}
                  content={data.offices._body}
                />
              </div>
              <div className="prose prose-h3:text-sswRed md:col-span-2">
                <OfficesSidebar 
                  phone={data.offices.phone} 
                  streetAddress={data.offices.streetAddress} 
                  suburb={data.offices.suburb}
                  addressLocality={data.offices.addressLocality}
                  addressRegion={data.offices.addressRegion}
                  postalCode={data.offices.postalCode}
                  addressCountry={data.offices.addressCountry}
                />
              </div>
            </div>
          </Container>
      </Layout>
  )
}

export const getStaticProps = async ({ params }) => {
  const tinaProps = await client.queries.offices({ 
    relativePath: `${params.filename}.mdx`
  });

  return { 
    props: {
      data: tinaProps.data,
      query: tinaProps.query,
      variables: tinaProps.variables
    }
  };
}

export const getStaticPaths = async () => {
  const pagesListData = await client.queries.officesConnection();
  return {
    paths: pagesListData.data.officesConnection.edges.map((page) => ({
      params: { filename: page.node._sys.filename },
    })),
    fallback: false,
  };
};

export type AsyncReturnType<T extends (...args: any) => Promise<any>> = // eslint-disable-line @typescript-eslint/no-explicit-any
  T extends (...args: any) => Promise<infer R> ? R : any; // eslint-disable-line @typescript-eslint/no-explicit-any
