import Link from "next/link";
import React from "react";
import { Button, Input, Template, wrapFieldsWithMeta } from "tinacms";
import { TinaInfo } from "../../../components/tina/tina-info";
export const BreadcrumbSchema: Template = {
  name: "breadcrumbs",
  label: "Breadcrumbs",
  ui: {
    previewSrc: "/images/thumbs/tina/client-logos.jpg",
  },
  fields: [
    {
      type: "string",
      label: "Final Breadcrumb",
      name: "finalBreadcrumb",
      ui: {
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
                  Reset
                </Button>
              </div>
              <span className="mt-2 block whitespace-normal font-sans text-xs text-gray-400">
                Note: This field defaults to the title of the current page
              </span>
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
              {" "}
              💡 Breadcrumb url segment mapping can be configured inside of{" "}
              <Link
                className="text-blue-600 hover:underline"
                href="/admin/index.html#/collections/edit/global/index"
              >
                global settings
              </Link>
            </TinaInfo>
          );
        },
      },
    },
  ],
};
