import { getTestimonialsByCategories } from "@/helpers/getTestimonials";
import { useSEO } from "@/hooks/useSeo";
import { fetchTinaData } from "@/services/tina/fetchTinaData";
import client from "@/tina/client";
import fs from "fs/promises";
import { Metadata } from "next";
import path from "path";
import TrainingPage from ".";
import { TinaClient } from "../../tina-client";

type GenerateMetaDataProps = {
  params: { filename: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
  params,
}: GenerateMetaDataProps): Promise<Metadata> {
  const tinaProps = await getData(params.filename);
  const seo = tinaProps.props.seo;

  if (seo && !seo.canonical) {
    seo.canonical = `${tinaProps.props.header.url}training/${params.filename}`;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { seoProps } = useSEO(seo);
  return { ...seoProps };
}

export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), "content/training");

  const files = await fs.readdir(contentDir);

  return files.map((file) => ({
    filename: path.parse(file).name,
  }));
}

const getData = async (filename: string) => {
  const tinaProps = await fetchTinaData(
    client.queries.trainingContentQuery,
    filename
  );

  const testimonialsResult = await getTestimonialsByCategories(["Internship"]);

  return {
    props: {
      data: tinaProps.data,
      query: tinaProps.query,
      variables: tinaProps.variables,
      testimonialResult: testimonialsResult || [],
      seo: tinaProps.data.training.seo,
      header: {
        url: tinaProps.data.global.header.url,
      },
    },
  };
};

export default async function Training({
  params,
}: {
  params: { filename: string };
}) {
  const { filename } = params;
  const { props } = await getData(filename);

  return <TinaClient props={props} Component={TrainingPage} />;
}
