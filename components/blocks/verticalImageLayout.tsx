import Image from "next/image";
import type { Template } from "tinacms";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { CustomLink } from "../customLink";

const RawImage = ({ data }) => {
  return (
    <Image
      src={data.imageSrc}
      alt={data.altText}
      height={data.height ?? 0}
      width={data.width ?? 0}
      sizes={data.sizes}
    />
  );
};

export const VerticalImageLayout = ({ data }) => {
  return (
    <div className="md:grid md:grid-cols-12 md:gap-x-6">
      <div className="col-span-5">
        {data.imageLink ? (
          <CustomLink href={data.imageLink}>
            <RawImage data={data} />
          </CustomLink>
        ) : (
          <RawImage data={data} />
        )}
      </div>
      <div className="col-span-7">
        <TinaMarkdown content={data.message} />
      </div>
    </div>
  );
};

export const verticalImageLayoutBlockSchema: Template = {
  name: "VerticalImageLayout",
  label: "Vertical Image Layout",
  fields: [
    {
      type: "image",
      label: "Image",
      name: "imageSrc",
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      uploadDir: () => "verticalImageLayout",
    },
    {
      type: "string",
      label: "Alt text",
      name: "altText",
      required: true,
    },
    {
      type: "string",
      label: "Link",
      name: "imageLink",
    },
    {
      type: "number",
      label: "Height",
      name: "height",
      required: true,
    },
    {
      type: "number",
      label: "Width",
      name: "width",
      required: true,
    },
    {
      type: "rich-text",
      label: "Message",
      name: "message",
      required: true,
    },
    {
      type: "string",
      name: "sizes",
      label: "Sizes - Advanced (optional)",
      description:
        "See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#sizes or https://nextjs.org/docs/pages/api-reference/components/image#sizes for more info",
      required: false,
    },
  ],
};
