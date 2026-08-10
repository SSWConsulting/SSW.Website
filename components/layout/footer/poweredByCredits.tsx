import { cn } from "@/lib/utils";
import Image from "next/image";
import { CustomLink } from "../../customLink";

export type PoweredByItem = {
  label?: string;
  url?: string;
  logo?: string;
};

// py-1/-my-1 grows the tap target to the WCAG 2.5.8 minimum without shifting
// layout; whitespace-nowrap keeps a credit from splitting from its logo.
const ITEM_CLASS = "-my-1 flex items-center gap-1.5 whitespace-nowrap py-1";

const CreditContent = ({ item }: { item: PoweredByItem }) => (
  <>
    {item.logo && (
      <Image
        src={item.logo}
        alt=""
        height={16}
        width={16}
        className="size-4 shrink-0 object-contain"
      />
    )}
    <span>{item.label}</span>
  </>
);

export const PoweredByCredits = ({ items }: { items?: PoweredByItem[] }) => {
  if (!items?.length) return null;

  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 uppercase tracking-wider text-gray-400">
      {items.map((item, index) =>
        item.url ? (
          <CustomLink
            key={item.url + index}
            href={item.url}
            className={cn(
              "unstyled transition-colors hover:text-white",
              ITEM_CLASS
            )}
          >
            <CreditContent item={item} />
          </CustomLink>
        ) : (
          <span key={(item.label ?? "") + index} className={ITEM_CLASS}>
            <CreditContent item={item} />
          </span>
        )
      )}
    </div>
  );
};
