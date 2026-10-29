import { Icon } from "@/components/blocksSubtemplates/tinaFormElements/icon";
import { tinaField } from "tinacms/dist/react";

type FeatureCard = {
  icon?: string | null;
  title?: string | null;
  text?: string | null;
};

export type ProductFeaturesData = {
  brow?: string | null;
  heading?: string | null;
  items?: (FeatureCard | null)[] | null;
};

// Adapted from <V3> Stack Cards: same brow + heading + card grid, with the
// link/arrow swapped for an icon tile and the hardcoded dark palette replaced
// by theme tokens, since this renders in both themes.
export const ProductFeatures = ({
  data,
}: {
  data?: ProductFeaturesData | null;
}) => {
  const items = (data?.items ?? []).filter((item): item is FeatureCard =>
    Boolean(item?.title)
  );

  if (!items.length) return null;

  return (
    <section>
      {data?.brow && (
        <span
          data-tina-field={tinaField(data, "brow")}
          className="font-mono text-xs uppercase tracking-wider text-sswRed"
        >
          {data.brow}
        </span>
      )}
      {data?.heading && (
        <h2
          data-tina-field={tinaField(data, "heading")}
          // m-0 p-0: styles.css gives every h2 `mb-2.5 mt-10`.
          className="m-0 mt-2 p-0 text-3xl leading-tight text-foreground lg:text-4xl"
        >
          {data.heading}
        </h2>
      )}

      {/* Three across at full width, two in the narrower two-column layout -
          the closest the standard scale gets to auto-fit minmax(220px, 1fr)
          inside a main column that is two thirds of the page. */}
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item, index) => (
          <div
            key={`product-feature-${index}`}
            className="flex min-h-sidebar-card flex-col gap-3.5 rounded-card border-0.75 border-hairline bg-white p-6 dark:bg-sswCard"
          >
            {item.icon && (
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-sswRed text-white">
                <Icon
                  data={{ name: item.icon }}
                  tinaField={tinaField(item, "icon")}
                  className="size-6"
                />
              </span>
            )}
            <h3
              data-tina-field={tinaField(item, "title")}
              className="m-0 p-0 text-xl font-semibold leading-tight text-foreground"
            >
              {item.title}
            </h3>
            {item.text && (
              <p
                data-tina-field={tinaField(item, "text")}
                className="m-0 text-base font-light leading-relaxed text-muted-foreground"
              >
                {item.text}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
