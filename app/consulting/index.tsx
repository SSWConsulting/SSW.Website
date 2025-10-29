"use client";

import { BuiltOnAzure } from "@/components/blocks/builtOnAzure";
import { Category } from "@/components/consulting/index/category";
import { Tag } from "@/components/consulting/index/tag";
import { Container } from "@/components/util/container";
import { Breadcrumbs } from "app/components/breadcrumb";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { MdLiveHelp } from "react-icons/md";
import { tinaField } from "tinacms/dist/react";

const allServices = "All SSW Services";

export default function ConsultingIndex({ tinaProps }) {
  const gridRef = useRef(null);
  const router = useRouter();
  const [selectedTag, setSelectedTag] = useState(allServices);

  const filterDidChange = useRef<boolean>(false);

  const node = tinaProps.data.consultingIndex;
  const searchParams = useSearchParams();
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
                p.page.id.replace("content", "").replace(".mdx", ""),
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
    // We stopped using Next.js's useSearchParams function because it lead to complete client-side rendering, which impacts SEO and page load performance,
    // Therefore we are now using javascript's function

    const tagParam = searchParams.get("tag");
    const query = getSelectedTagFromQuery(tagParam);
    setSelectedTag(query || allServices);
  }, [searchParams]);

  return (
    <>
      <Container className="flex-1 pt-2">
        <div className="min-h-8 w-full max-w-9xl md:min-h-12">
          <Breadcrumbs path={"/consulting"} title={"Services"} />
        </div>
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
                      filterDidChange.current = true;
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
              <FilterContextProvider filterDidChange={filterDidChange.current}>
                {categories.map((category, index) => (
                  <Category
                    tinaData={node}
                    key={category.name}
                    category={category}
                    selectedTag={selectedTag}
                    index={index}
                  />
                ))}
              </FilterContextProvider>
            </div>
          </div>
        </div>
      </Container>
      <BuiltOnAzure data={tinaProps.azureBanner} />
    </>
  );
}

const getSelectedTagFromQuery = (query: string): string => {
  let parsedTag = allServices;
  if (query) {
    const tag = query;

    if (Array.isArray(tag)) {
      parsedTag = tag[0];
    } else {
      parsedTag = tag;
    }
    parsedTag = parsedTag.replace("-", " ");
  }
  return parsedTag;
};

const useFilterContext = () => React.useContext(FilterContext);

const FilterContext = React.createContext({ filterDidChange: false });

const FilterContextProvider = ({
  children,
  filterDidChange,
}: {
  children: React.ReactNode;
  filterDidChange: boolean;
}) => {
  return (
    <FilterContext.Provider value={{ filterDidChange }}>
      {children}
    </FilterContext.Provider>
  );
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

export { useFilterContext };
