import { Blocks } from "@/components/blocks-renderer";
import { BuiltOnAzure } from "@/components/blocks/builtOnAzure";
import { componentRenderer } from "@/components/blocks/mdxComponentRenderer";
import { Container } from "@/components/util/container";
import { Section } from "@/components/util/section";
import classNames from "classnames";
import { useEffect, useMemo } from "react";
import { WebSite, WithContext } from "schema-dts";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export default function PageContent({ props }) {
  const { data } = props;

  const structuredData: WithContext<WebSite> = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: data.global?.header.site_name,
      alternateName: data.global?.header?.alternate_site_name,
      description: data.global.header.description,
      url: data.global.header.url,
    }),
    [data.global?.header]
  );

  const contentClass = data.page.sideBar
    ? "max-w-full md:col-span-3 prose prose-h2:text-3xl/9 prose-h2:text-black"
    : "max-w-full md:col-span-5 prose prose-h2:text-3xl/9 prose-h2:text-black";

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    // Cleanup to remove the script when the component unmounts
    return () => {
      document.head.removeChild(script);
    };
  }, [structuredData]);
  return (
    <>
      {data.page?.title && (
        <Section
          className="mx-auto w-full max-w-9xl px-8"
          data-tina-field={tinaField(data.page, "title")}
        >
          <h1 className="mt-4 py-2">{data.page.title}</h1>
        </Section>
      )}
      {data.page?.subTitle && (
        <Section
          className="mx-auto w-full max-w-9xl px-8"
          data-tina-field={tinaField(data.page, "title")}
        >
          <span>
            <TinaMarkdown
              content={data.page?.subTitle}
              data-tina-field={tinaField(data.page, "subTitle")}
              components={componentRenderer}
            />
          </span>
        </Section>
      )}
      <Blocks prefix="PageBeforeBody" blocks={data.page.beforeBody} />
      <Container
        className={classNames("flex-1", {
          "pt-0": data.page.removeBodyTopMargin,
        })}
      >
        <div className="gap-20 pt-3 md:grid md:grid-cols-5">
          <div
            className={classNames(contentClass, {
              "text-center": data.page.centeredBodyText,
            })}
            data-tina-field={tinaField(data.page, "_body")}
          >
            <TinaMarkdown
              content={data.page._body}
              components={componentRenderer}
            />
          </div>

          {!!data.page.sideBar && (
            <div className="mt-5 md:col-span-2 md:mt-0">
              <Blocks prefix="PageSideBar" blocks={data.page.sideBar} />
            </div>
          )}
        </div>
      </Container>
      <div className="no-print">
        <Blocks prefix="PageAfterBody" blocks={data.page.afterBody} />
      </div>
      <BuiltOnAzure data={data.page.azureBanner} />
    </>
  );
}
