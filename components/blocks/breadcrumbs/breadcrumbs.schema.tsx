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
        }), // make final breadcrumb heading bigger
        // make all headings the same size
        // fix the bug when the final breadcrumb is not set
        // fix the note to be smaller
        // add a note under show breadcrumb to indicate that this is for the old breadcrumb components
        // add a title (similar to seo and blocks) in seo values
        // talk to matt about moving the "filename" field to the top
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
