import { tinaField } from "tinacms/dist/react";

export type ProductQuoteData = {
  text?: string | null;
  author?: string | null;
};

// One pull quote from one customer, rather than the shared testimonial blocks:
// those all render a list backed by the testimonials collection, and a product
// page carries a single line. The red rule and mono attribution are the same
// accents ProductFeatures and the sidebar already use.
export const ProductQuote = ({ data }: { data?: ProductQuoteData | null }) => {
  if (!data?.text) return null;

  return (
    <figure className="m-0 border-l-2 border-sswRed pl-6 max-md:pl-5">
      <blockquote
        data-tina-field={tinaField(data, "text")}
        className="m-0 border-0 p-0 text-xl font-light leading-snug text-foreground lg:text-2xl"
      >
        {data.text}
      </blockquote>

      {data.author && (
        <figcaption
          data-tina-field={tinaField(data, "author")}
          className="mt-4 font-mono text-xs uppercase tracking-wider text-muted-foreground"
        >
          {data.author}
        </figcaption>
      )}
    </figure>
  );
};
