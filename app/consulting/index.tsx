"use client";

import { useRouter } from "next/navigation";

import { useEffect, useMemo, useRef, useState } from "react";
import { MdLiveHelp } from "react-icons/md";

import { wrapGrid } from "animate-css-grid";

import { tinaField } from "tinacms/dist/react";

import { Category } from "@/components/consulting/index/category";
import { Tag } from "@/components/consulting/index/tag";
import { Container } from "@/components/util/container";
import { Breadcrumbs } from "app/components/breadcrumb";
import { useSearchParams } from "next/navigation";
import { ParsedUrlQuery } from "querystring";

const allServices = "All SSW Services";

export default function ConsultingIndex({ tinaProps }) {
  const gridRef = useRef(null);
  const params = useSearchParams();
  const router = useRouter();
  const [selectedTag, setSelectedTag] = useState(
    getSelectedTagFromQuery(params.get("tag") as unknown as ParsedUrlQuery)
  );

  const node = tinaProps.data.consultingIndex;

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
    const qsTag = getSelectedTagFromQuery(
      params.get("tag") as unknown as ParsedUrlQuery
    );
    setSelectedTag(qsTag);
  }, [params]);

  useEffect(() => {
    // grid animation seutp - will automatically clean itself up when dom node is removed
    wrapGrid(gridRef.current);
  }, []);

  return (
    <>
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
                  data-tina-field={tinaField(node.sidebar[index], "label")}
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
                  tinaData={node}
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
    </>
  );
}

const getSelectedTagFromQuery = (query: ParsedUrlQuery): string => {
  let parsedTag = allServices;
  if (query) {
    const tag = query;

    if (tag instanceof Array) {
      parsedTag = tag[0];
    } else {
      parsedTag = tag as unknown as string;
    }
    parsedTag = parsedTag.replace("-", " ");
  }
  return parsedTag;
};

const updateParams = (router, tags, selectedTag) => {
  if (tags.some((x) => x.name === selectedTag)) {
    const query =
      selectedTag === allServices
        ? {}
        : {
            tag: selectedTag?.replace(" ", "-"),
          };
    router.push(`/consulting${query.tag ? `?tag=${query.tag}` : ""}`);
  }
};
