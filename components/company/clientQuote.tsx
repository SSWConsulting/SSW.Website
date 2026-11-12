import type { ContentCardProps } from "@/components/blocks/contentCard";
import { storyText } from "@/helpers/clients";
import { TinaMarkdown } from "tinacms/dist/rich-text";

// Client testimonials store the attribution in their final paragraph.
export const ClientQuote = ({ data }: ContentCardProps) => {
  const paragraphs = data.content.children ?? [];
  const hasAttribution = paragraphs.length > 1;
  const quote = hasAttribution ? paragraphs.slice(0, -1) : paragraphs;
  const attribution = hasAttribution
    ? storyText(paragraphs[paragraphs.length - 1])
    : "";
  const separator = attribution.match(/ - |, /);
  const name = separator ? attribution.slice(0, separator.index) : attribution;
  const role = separator
    ? attribution.slice(separator.index + separator[0].length)
    : "";

  return (
    <figure className="not-prose my-8 border-l-2 border-sswRed pl-5 md:pl-6">
      <blockquote className="m-0 break-words border-0 p-0 text-xl font-normal leading-snug text-foreground md:text-2xl md:leading-snug">
        {quote.map((paragraph, index) => (
          <TinaMarkdown<Record<never, never>>
            key={index}
            content={[paragraph]}
            components={{
              p: ({ children }) => (
                <p className="mb-4 last:mb-0">
                  {index === 0 && "“"}
                  {children}
                  {index === quote.length - 1 && "”"}
                </p>
              ),
              italic: ({ children }) => <span>{children}</span>,
              bold: ({ children }) => (
                <strong className="font-normal text-brand">{children}</strong>
              ),
            }}
          />
        ))}
      </blockquote>
      {attribution && (
        <figcaption className="mt-6 flex flex-col gap-1 text-base leading-normal">
          <span className="font-semibold text-foreground">{name}</span>
          {role && (
            <span className="text-sm text-muted-foreground">{role}</span>
          )}
        </figcaption>
      )}
    </figure>
  );
};
