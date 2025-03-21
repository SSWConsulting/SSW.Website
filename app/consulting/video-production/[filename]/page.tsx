import { fetchTinaData } from "@/services/tina/fetchTinaData";
import client from "@/tina/client";
import "aos/dist/aos.css"; // This is important to keep the animation
import fs from "fs/promises";
import { useSEO } from "hooks/useSeo";
import { Metadata } from "next";
import path from "path";
import { TinaClient } from "../../../tina-client";
import VideoProduction from "./video-production";

export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), "content/video-production");

  const files = await fs.readdir(contentDir);

  return files.map((file) => ({
    filename: path.parse(file).name,
  }));
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
  params: { filename: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
  params,
}: GenerateMetaDataProps): Promise<Metadata> {
  const { props } = await getData(params.filename);

  const { seo } = props;
  if (seo && !seo.canonical) {
    seo.canonical = `${props.header.url}consulting/video-production/${params.filename}`;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { seoProps } = useSEO(seo);

  return { ...seoProps };
}

export default async function Consulting({
  params,
}: {
  params: { filename: string };
}) {
  const { filename } = params;

  const { props } = await getData(filename);

  return <TinaClient props={props} Component={VideoProduction} />;
}
