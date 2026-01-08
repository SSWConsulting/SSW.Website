import { TinaClient } from "@/app/tina-client";
import { getSEOProps } from "@/lib/seo";
import { fetchTinaData } from "@/services/tina/fetchTinaData";
import client from "@/tina/client";
import "aos/dist/aos.css"; // This is important to keep the animation
import { Metadata } from "next";
import ClientVideoProductionFallback from "./client-fallback";
import VideoProduction from "./video-production";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  let pageListData = await client.queries.videoProductionConnection();
  const allPagesListData = pageListData;

  while (pageListData.data.videoProductionConnection.pageInfo.hasNextPage) {
    const lastCursor =
      pageListData.data.videoProductionConnection.pageInfo.endCursor;
    pageListData = await client.queries.videoProductionConnection({
      after: lastCursor,
    });

    allPagesListData.data.videoProductionConnection.edges.push(
      ...pageListData.data.videoProductionConnection.edges
    );
  }

  const pages = allPagesListData.data.videoProductionConnection.edges.map(
    (page) => ({
      filename: page.node._sys.filename,
    })
  );

  return pages;
}

const getData = async (filename: string) => {
  const tinaProps = await fetchTinaData(
    client.queries.videoProductionContentQuery,
    filename
  );
  return null;

  const seo = tinaProps.data.videoProduction.seo;

  return {
    props: {
      data: tinaProps.data,
      query: tinaProps.query,
      variables: tinaProps.variables,
      header: {
        url: tinaProps.data.global.header.url,
      },
      seo,
      ...tinaProps,
    },
  };
};

type GenerateMetaDataProps = {
  params: Promise<{ filename: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// export async function generateMetadata(
//   prop: GenerateMetaDataProps
// ): Promise<Metadata> {
//   const params = await prop.params;
//   const { props } = await getData(params.filename);

//   const { seo } = props;
//   if (seo && !seo.canonical) {
//     seo.canonical = `${props.header.url}consulting/video-production/${params.filename}`;
//   }

//   return getSEOProps(seo);
// }

export default async function Consulting(prop: {
  params: Promise<{ filename: string }>;
}) {
  const params = await prop.params;
  const { filename } = params;

  const dataResult = await getData("bogus");
  if (!dataResult || !dataResult.props || !dataResult.props.data) {
    // Fallback to client-side fetch if SSR data is missing
    return <ClientVideoProductionFallback filename={filename} />;
  }

  return <TinaClient props={dataResult.props} Component={VideoProduction} />;
}
