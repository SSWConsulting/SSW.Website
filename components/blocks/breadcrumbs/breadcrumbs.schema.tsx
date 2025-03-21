import Link from "next/link";
import React from "react";
import { Button, Input, Template, wrapFieldsWithMeta } from "tinacms";
import { backgroundSchema } from "../../../components/layout/v2ComponentWrapper.schema";
import { TinaInfo } from "../../tina/tina-info";

export const BreadcrumbSchema: Template = {
  name: "breadcrumbs",
  label: "<V2> Breadcrumbs",
  ui: {
    previewSrc: "/images/thumbs/tina/breadcrumbs.jpg",
  },
  fields: [
    //@ts-expect-error – custom component typing won't be pinned down
    backgroundSchema,
    {
      type: "string",
      label: "Final Breadcrumb",
      name: "finalBreadcrumb",
      ui: {
        validate: (value) => {
          if (typeof value === "string") {
            value = value.trim();
          }
          return value ? null : "The final breadcrumb must be filled out";
        },
        component: wrapFieldsWithMeta(({ form, input }) => {
          const formState = form.getState();
          return (
            <div>
              <div className="flex gap-4">
                <Input {...input} />
                <Button
                  variant="primary"
                  onClick={() => {
                    input.onChange(formState.values.seo.title);
                  }}
                >
                  Use Page Title
                </Button>
              </div>
            </div>
          );
        }),
      },
      description: "The final breadcrumb in the list",
    },
    {
      type: "string",
      name: "tip",
      label: "Tip",
      ui: {
        component: () => {
          return (
            <TinaInfo>
              💡 Customize how sections appear in your navigation breadcrumbs in{" "}
              <Link
                className="text-blue-600 hover:underline"
                href="/admin/index.html#/collections/edit/global/index"
              >
                global settings
              </Link>
              . For example, you can make &apos;/consulting&apos; routes show as
              &apos;Services&apos; in the breadcrumb trail.
            </TinaInfo>
          );
        },
      },
    },
  ],
};
