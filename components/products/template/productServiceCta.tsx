import RippleButton from "@/components/button/rippleButtonV2";
import { BiRightArrowAlt } from "react-icons/bi";
import { tinaField } from "tinacms/dist/react";

type ServiceReference = {
  _sys?: { filename?: string | null } | null;
  id?: string | null;
} | null;

export type ProductServiceCtaData = {
  service?: ServiceReference;
  heading?: string | null;
  text?: string | null;
  label?: string | null;
};

// Both consulting collections serve /consulting/<filename>, so the slug is all
// that's needed. `id` is the document's path, e.g. content/consultingv2/bots.json.
export const serviceHref = (service: ServiceReference) => {
  const filename =
    service?._sys?.filename ??
    service?.id
      ?.split("/")
      .pop()
      ?.replace(/\.(json|mdx)$/, "");

  return filename ? `/consulting/${filename}` : undefined;
};

export const ProductServiceCta = ({
  data,
}: {
  data?: ProductServiceCtaData | null;
}) => {
  const href = serviceHref(data?.service);

  if (!href || !data?.heading) return null;

  return (
    <section className="relative isolate overflow-hidden rounded-card bg-sswDarkGray px-12 py-16 text-center max-md:px-6 max-md:py-12">
      {/* Two layers, because one element can only carry one background image. */}
      <span aria-hidden className="absolute inset-0 bg-red-glow-tl" />
      <span aria-hidden className="absolute inset-0 bg-red-glow-r" />

      <div className="relative mx-auto flex max-w-screen-sm flex-col items-center">
        <h2
          data-tina-field={tinaField(data, "heading")}
          // m-0 p-0: styles.css gives every h2 `mb-2.5 mt-10` and a red colour.
          className="m-0 p-0 text-3xl leading-tight text-white lg:text-4xl"
        >
          {data.heading}
        </h2>

        {data.text && (
          <p
            data-tina-field={tinaField(data, "text")}
            className="m-0 mt-6 max-w-lg text-base font-light text-gray-300"
          >
            {data.text}
          </p>
        )}

        {data.label && (
          <RippleButton
            variant="primary"
            href={href}
            textTinaField={tinaField(data, "label")}
            className="mt-8 inline-flex min-h-12 px-5 py-3.5 text-base font-semibold"
          >
            {data.label}
            <BiRightArrowAlt className="size-5" />
          </RippleButton>
        )}
      </div>
    </section>
  );
};
