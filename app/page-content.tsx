import { Blocks } from "@/components/blocks-renderer";

import { componentRenderer } from "@/components/blocks/mdxComponentRenderer";
import { Container } from "@/components/util/container";
import { Section } from "@/components/util/section";
import { removeExtension } from "@/services/client/utils.service";
import { Breadcrumbs } from "app/components/breadcrumb";
import classNames from "classnames";
import { useEffect } from "react";
import { WebSite, WithContext } from "schema-dts";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export default function PageContent({ props }) {
  const { data } = props;

  const contentClass = data.page.sideBar
    ? "max-w-full md:col-span-3 prose prose-h2:text-3xl/9 prose-h2:text-black"
    : "max-w-full md:col-span-5 prose prose-h2:text-3xl/9 prose-h2:text-black";

  useEffect(() => {
    const structuredData: WithContext<WebSite> = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: props?.data.global?.header.site_name,
      alternateName: props?.data.global?.header?.alternate_site_name,
      description: props?.data.global.header.description,
      url: props?.data.global.header.url,
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    // Cleanup to remove the script when the component unmounts
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <>
      {data.page.breadcrumbs && (
        <Section className="mx-auto w-full max-w-9xl px-8 py-5">
          <Breadcrumbs
            path={removeExtension(props.variables.relativePath)}
            suffix={data.global.breadcrumbSuffix}
            title={data.page.seo?.title}
          />
        </Section>
      )}
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
    </>
  );
}
