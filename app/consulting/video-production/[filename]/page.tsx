import { fetchTinaData } from "@/services/tina/fetchTinaData";
import client from "@/tina/client";
import "aos/dist/aos.css"; // This is important to keep the animation
import { useSEO } from "hooks/useSeo";
import { Metadata } from "next";
import { TinaClient } from "../../../tina-client";
import VideoProduction from "./video-production";

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

export async function generateMetadata(
  props0: GenerateMetaDataProps
): Promise<Metadata> {
  const params = await props0.params;
  const { props } = await getData(params.filename);

  const { seo } = props;
  if (seo && !seo.canonical) {
    seo.canonical = `${props.header.url}consulting/video-production/${params.filename}`;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { seoProps } = useSEO(seo);

  return { ...seoProps };
}

export default async function Consulting(props0: {
  params: Promise<{ filename: string }>;
}) {
  const params = await props0.params;
  const { filename } = params;

  const { props } = await getData(filename);

  return <TinaClient props={props} Component={VideoProduction} />;
}
