import { NextRouter, useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import { MdLiveHelp } from "react-icons/md";

import { wrapGrid } from "animate-css-grid";

import { tinaField, useTina } from "tinacms/dist/react";
import { client } from "../../.tina/__generated__/client";

import { InferGetStaticPropsType } from "next";
import { ParsedUrlQuery } from "querystring";
import { Breadcrumbs } from "../../components/blocks/breadcrumbs";
import { Category } from "../../components/consulting/index/category";
import { Tag } from "../../components/consulting/index/tag";
import { Layout } from "../../components/layout";
import { Container } from "../../components/util/container";
import { SEO } from "../../components/util/seo";

const allServices = "All SSW Services";

export default function ConsultingIndex(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const gridRef = useRef(null);
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const router = useRouter();
  const [selectedTag, setSelectedTag] = useState(
    getSelectedTagFromQuery(router.query)
  );

  const node = data.consultingIndexConnection.edges[0].node;

  const categories = useMemo(() => {
    return node.categories
      .filter((c) => c.pages && c.pages.length > 0)
      .map((c) => {
        return {
          name: c.category.name,
          pages: c.pages.map((p) => {
            return {
              url:
                p.externalUrl ||
                p.page.id.replace("content/", "").replace(".mdx", ""),
              title: p.title,
              description: p.description,
              logo: p.logo,
              tags: p.tags
                ? [allServices, ...p.tags.map((t) => t.tag?.name)]
                : [allServices],
            };
          }),
        };
      });
  }, [node]);

  const tags = useMemo(
    () =>
      node.sidebar?.map((item) => {
        return {
          label: item.label,
          name: item.tag?.name,
        };
      }),
    [node]
  );

  useEffect(() => {
    // as the querystring changes, update the selected tag
    const qsTag = getSelectedTagFromQuery(router.query);
    setSelectedTag(qsTag);
  }, [router.query]);

  useEffect(() => {
    // grid animation seutp - will automatically clean itself up when dom node is removed
    wrapGrid(gridRef.current);
  }, []);

  const tinaData = data.consultingIndexConnection.edges[0].node;

  return (
    <Layout>
      <SEO seo={{ ...props.seo, canonical: "/consulting" }} />
      <Container className="flex-1 pt-2">
        <Breadcrumbs path={"/consulting"} suffix="" title={"Services"} />
        <h1 className="pt-0 text-3xl">Consulting Services</h1>
        <div className="flex flex-col md:flex-row">
          <div className="shrink-0 md:pr-20">
            <h3 className="mb-4 text-sswRed">
              <MdLiveHelp className="inline-block" /> I am looking for...
            </h3>
            <ul className="list-none">
              {tags?.map((tag, index) => (
                <div
                  data-tina-field={tinaField(tinaData.sidebar[index], "label")}
                  key={tag.name}
                >
                  <Tag
                    label={tag.label}
                    tag={tag.name}
                    selectedTag={selectedTag}
                    setSelectedTag={(val) => {
                      updateParams(router, tags, val);
                      setSelectedTag(val);
                    }}
                  />
                </div>
              ))}
            </ul>
          </div>
          <div>
            <div
              ref={gridRef}
              className="grid grid-cols-1 gap-2 lg:grid-cols-2"
            >
              {categories.map((category, index) => (
                <Category
                  tinaData={tinaData}
                  key={category.name}
                  category={category}
                  selectedTag={selectedTag}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
}

const getSelectedTagFromQuery = (query: ParsedUrlQuery): string => {
  let parsedTag = allServices;
  if (query.tag) {
    const { tag } = query;

    if (tag instanceof Array) {
      parsedTag = tag[0];
    } else {
      parsedTag = tag;
    }
    parsedTag = parsedTag.replace("-", " ");
  }
  return parsedTag;
};

const updateParams = (router: NextRouter, tags, selectedTag) => {
  if (tags.some((x) => x.name === selectedTag)) {
    router.push(
      {
        pathname: router.basePath,
        query:
          selectedTag === allServices
            ? {}
            : {
                tag: selectedTag?.replace(" ", "-"),
              },
      },
      undefined,
      { shallow: true }
    );
  }
};

export const getStaticProps = async () => {
  const tinaProps = await client.queries.consultingIndexConnection();

  const globalData = await client.queries.global({
    relativePath: "index.json",
  });

  const seo = tinaProps.data.consultingIndexConnection.edges[0].node.seo;
  if (seo && !seo.canonical) {
    seo.canonical = `${globalData.data.global.header.url}/consulting`;
  }

  return {
    props: {
      data: tinaProps.data,
      query: tinaProps.query,
      variables: tinaProps.variables,
      seo,
    },
  };
};
