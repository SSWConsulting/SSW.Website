import { getTestimonialsByCategories } from "@/helpers/getTestimonials";
import { getSEOProps } from "@/lib/seo";
import { fetchTinaData } from "@/services/tina/fetchTinaData";
import client from "@/tina/client";
import { Metadata } from "next";
import TrainingPage from ".";
import { TinaClient } from "../../../tina-client";

type GenerateMetaDataProps = {
  params: Promise<{ filename: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  prop: GenerateMetaDataProps
): Promise<Metadata> {
  const params = await prop.params;
  const tinaProps = await getData(params.filename);
  const seo = tinaProps.props.seo;

  if (seo && !seo.canonical) {
    seo.canonical = `${tinaProps.props.header.url}training/${params.filename}`;
  }

  return getSEOProps(seo);
}

export async function generateStaticParams() {
  const pagesListData = await client.queries.trainingConnection();

  return pagesListData.data.trainingConnection.edges.map((page) => ({
    filename: page.node._sys.filename,
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

export default async function Training(prop: {
  params: Promise<{ filename: string }>;
}) {
  const params = await prop.params;
  const { filename } = params;
  const { props } = await getData(filename);

  return <TinaClient props={props} Component={TrainingPage} />;
}
