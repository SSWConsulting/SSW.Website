import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { BsArrowRightCircle } from "react-icons/bs";
import { MdLiveHelp } from "react-icons/md";
import { useEffectOnce, useHover } from "usehooks-ts";

import { wrapGrid } from "animate-css-grid";

import { useTina } from "tinacms/dist/react";
import { client } from "../../.tina/__generated__/client";

import { InferGetStaticPropsType } from "next";
import { Breadcrumbs } from "../../components/blocks/breadcrumbs";
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
  const getSelectedTagFromQuery = (): string => {
    let parsedTag = allServices;
    if (router.query.tag) {
      const { tag } = router.query;

      if (tag instanceof Array) {
        parsedTag = tag[0];
      } else {
        parsedTag = tag;
      }
      parsedTag = parsedTag.replace("-", " ");
    }
    return parsedTag;
  };

  const [selectedTag, setSelectedTag] = useState(getSelectedTagFromQuery());
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [seo, setSeo] = useState(null);

  useEffect(() => {
    // extract the data we need from the tina result
    const processedData = processData(data);
    setCategories(processedData.categories);
    setTags(processedData.tags);
    setSeo(processedData.seo);
  }, [data]);

  useEffect(() => {
    // as the querystring changes, update the selected tag
    const qsTag = getSelectedTagFromQuery();
    if (qsTag !== selectedTag) {
      setSelectedTag(qsTag);
    }
  }, [router.query]);

  useEffect(() => {
    // when the selected tag changes, update the querystring
    if (!tags.some((x) => x.name === selectedTag)) {
      return;
    }

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
  }, [selectedTag]);

  useEffectOnce(() => {
    // grid animation seutp - will automatically clean itself up when dom node is removed
    wrapGrid(gridRef.current);
  });

  return (
    <Layout>
      <SEO seo={{ ...seo, canonical: "/consulting" }} />
      <Container className="flex-1 pt-2">
        <Breadcrumbs path={"/consulting"} suffix="" title={"Services"} />
        <h1 className="pt-0 text-3xl">Consulting Services</h1>
        <div className="flex flex-col md:flex-row">
          <div className="shrink-0 md:pr-20">
            <h3 className="mb-4 text-sswRed">
              <MdLiveHelp className="mr-2 inline-block" />I am looking for...
            </h3>
            <ul className="list-none">
              {tags?.map((tag) => (
                <Tag
                  label={tag.label}
                  key={tag.name}
                  tag={tag.name}
                  selectedTag={selectedTag}
                  setSelectedTag={setSelectedTag}
                />
              ))}
            </ul>
          </div>
          <div>
            <div
              ref={gridRef}
              className="grid grid-cols-1 gap-2 lg:grid-cols-2"
            >
              {categories.map((category) => (
                <Category
                  key={category.name}
                  category={category}
                  selectedTag={selectedTag}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
}

const Tag = ({ label, tag, selectedTag, setSelectedTag }) => {
  const isSelected = tag === selectedTag;
  const hoverRef = useRef(null);
  const hovered = useHover(hoverRef);

  return (
    <li
      className={classNames(
        "cursor-pointer p-1 ease-in-out",
        "duration-500 hover:bg-gray-100 hover:ease-in-out",
        isSelected ? "text-sswRed" : ""
      )}
      onClick={() => setSelectedTag(tag)}
      ref={hoverRef}
    >
      <div
        className={classNames(
          "inline-block h-3.5 w-6 text-sswRed",
          !hovered && !isSelected && "-translate-x-2",
          hovered && "translate-x-0 duration-300 ease-in"
        )}
      >
        {(isSelected || hovered) && <BsArrowRightCircle />}
      </div>
      <span className="truncate">{label}</span>
    </li>
  );
};

const Category = ({ category, selectedTag }) => {
  const pages = category.pages.map((page) => {
    return {
      ...page,
      isVisible: page.tags.includes(selectedTag),
    };
  });

  const categoryVisible = pages.some((page) => page.isVisible);

  return (
    <>
      <div
        className={classNames("lg:col-span-2", !categoryVisible && "hidden")}
      >
        {/* animate-css-grid requires a single element at this level */}
        <div>
          <hr className="my-5 border-gray-100" />
          <h2 className="mt-0 text-sswRed">{category.name}</h2>
        </div>
      </div>
      {pages.map((page) => (
        <PageCard key={page.title} page={page} />
      ))}
    </>
  );
};

const PageCard = ({ page }) => {
  return (
    <div
      className={classNames(
        "relative bg-white p-3 hover:bg-gray-50",
        !page.isVisible && "hidden"
      )}
    >
      {/* animate-css-grid requires a single element at this level */}
      <div className="flex">
        <div className="shrink-0">
          {page.logo && (
            <Image
              className="mr-4 aspect-square h-14 w-14 border-1 border-gray-100 md:h-28 md:w-28"
              height={115}
              width={115}
              src={page.logo}
              alt={`${page.title} logo`}
            />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <Link href={page.url} className="unstyled">
            <span className="absolute inset-0" aria-hidden="true" />
            <h3 className="mb-2 mt-0 text-lg text-sswRed">{page.title}</h3>
            <p className="text-sm text-black">{page.description}</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

const processData = (data) => {
  if (data.consultingIndexConnection.edges.length !== 1) {
    throw new Error("Expected exactly one consulting index page");
  }

  const node = data.consultingIndexConnection.edges[0].node;

  const categories = node.categories
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
            tags: [allServices, ...p.tags.map((t) => t.tag.name)],
          };
        }),
      };
    });

  const tags = node.sidebar?.map((item) => {
    return {
      label: item.label,
      name: item.tag?.name,
    };
  });

  return {
    categories,
    tags,
    seo: node.seo,
  };
};

export const getStaticProps = async () => {
  const tinaProps = await client.queries.consultingIndexConnection();

  return {
    props: {
      ...tinaProps,
    },
  };
};
