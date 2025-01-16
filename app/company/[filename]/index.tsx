"use client";

import { Blocks } from "@/components/blocks-renderer";
import { BuiltOnAzure } from "@/components/blocks/builtOnAzure";
import { componentRenderer } from "@/components/blocks/mdxComponentRenderer";
import { TechUpgrade } from "@/components/blocks/techUpgrade";
import HistoryTimeline from "@/components/company/historyTimeline";
import { RDPanel } from "@/components/company/rdPanel";
import TestimonialPanel from "@/components/offices/testimonialPanel";
import { Section } from "@/components/util/section";
import { removeExtension } from "@/services/client/utils.service";
import { Breadcrumbs } from "app/components/breadcrumb";
import classNames from "classnames";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export default function CompanyPage({ tinaProps, props }) {
  const { data } = tinaProps;

  const { historyCardProps } = props;

  return (
    <>
      <div>
        <Blocks prefix="CompanyBeforeBody" blocks={data.company.beforeBody} />
        {data.company.seo?.showBreadcrumb === null ||
          (data.company.seo?.showBreadcrumb && (
            <Section className="mx-auto min-h-24 w-full max-w-9xl px-8 py-5 md:min-h-16">
              <Breadcrumbs
                path={removeExtension(props.variables.relativePath)}
                title={data.company.seo?.title}
                seoSchema={data.company.seo}
              />
            </Section>
          ))}
        {data.company.title && (
          <Section
            className="mx-auto w-full max-w-9xl px-8"
            data-tina-field={tinaField(data.company, "title")}
          >
            <h1 className="mt-4 py-2">{data.company.title}</h1>
          </Section>
        )}
        {data.company.subTitle && (
          <section
            className={classNames(
              "prose mx-auto w-full max-w-9xl flex-row px-8 pb-8 prose-h1:my-0 prose-h1:pt-8 prose-h2:mt-8 prose-img:my-0",
              data.company.fullWidthBody ? "" : "md:flex"
            )}
          >
            <div>
              <TinaMarkdown
                content={data.company.subTitle}
                data-tina-field={tinaField(data.company, "subTitle")}
                components={componentRenderer}
              />
            </div>
            {(data.company.sidebar ||
              data.company.sidebarTestimonial ||
              data.company.showRdPanel) && (
              <div className="max-w-sm shrink pl-16">
                {data.company.sidebar && (
                  <div
                    className={classNames("md:block", {
                      hidden: data.company.hideSidebarOnMobile,
                      "min-w-fit": data.company.fixedWidthSidebar,
                    })}
                  >
                    <TinaMarkdown
                      content={data.company.sidebar}
                      components={componentRenderer}
                    />
                  </div>
                )}
                {data.company.sidebarTestimonial && (
                  <TestimonialPanel
                    testimonialName={data.company.sidebarTestimonial}
                  />
                )}
                {data.company.showRdPanel && <RDPanel />}
              </div>
            )}
          </section>
        )}

        <Blocks prefix="Company_body" blocks={data.company._body} />
        {data.company.historyCards?.length > 0 && (
          <Section className="mx-auto w-full max-w-9xl px-8 py-5">
            <HistoryTimeline cardProps={historyCardProps} />
          </Section>
        )}
        {data.company.showTechUpgradeBlock && (
          <Section className="mx-auto w-full !bg-gray-75 px-8 py-5">
            <TechUpgrade />
          </Section>
        )}
        <Section>
          <BuiltOnAzure data={data.company.azureBanner} />
        </Section>
      </div>
    </>
  );
}
