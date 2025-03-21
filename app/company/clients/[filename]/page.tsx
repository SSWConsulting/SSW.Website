import { fetchTinaData } from "@/services/tina/fetchTinaData";
import client from "@/tina/client";
import fs from "fs/promises";
import { useSEO } from "hooks/useSeo";
import { Metadata } from "next";
import path from "path";
import { TinaClient } from "../../../tina-client";
import CaseStudies from "./index";

export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), "content/company/case-study");

  const files = await fs.readdir(contentDir);

  return files.map((file) => ({
    filename: path.parse(file).name,
  }));
}

const getData = async (filename: string) => {
  const tinaProps = await fetchTinaData(
    client.queries.caseStudyContentQuery,
    filename
  );

  const seo = tinaProps.data.caseStudy.seo;

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
  const tinaProps = await getData(params.filename);

  const seo = tinaProps.props.seo;
  if (seo && !seo.canonical) {
    seo.canonical = `${tinaProps.props.header.url}company/clients/${params.filename}`;
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

  return <TinaClient props={props} Component={CaseStudies} />;
}
