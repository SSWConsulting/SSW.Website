import { BluredBase64Image } from "@/helpers/images";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { FC } from "react";
import { tinaField } from "tinacms/dist/react";

export type ConsultingCardProps = {
  url: string;
  title: string;
  description: string;
  logo?: string;
  popular?: boolean;
  tinaPage: Record<string, unknown>;
};

const ConsultingCard: FC<ConsultingCardProps> = ({
  url,
  title,
  description,
  logo,
  popular,
  tinaPage,
}) => {
  return (
    <a
      href={url}
      className={cn(
        // border-0.75, not `border`: borderWidth.DEFAULT is 3px
        // in this repo, which is far too heavy for a card hairline.
        "unstyled group flex min-h-20 items-center gap-3 rounded-xl border-0.75 p-3 text-inherit no-underline transition-colors duration-300 motion-reduce:transition-none",
        "border-stroke-weak bg-gray-50 hover:border-brand hover:bg-white dark:border-hairline dark:bg-card dark:hover:border-brand dark:hover:bg-card-hover",
        "max-md:min-h-16 max-md:p-2.5"
      )}
    >
      <div className="flex size-12 flex-none items-center justify-center rounded-lg bg-white max-md:size-10">
        {logo && (
          <Image
            src={logo}
            alt={`${title} logo`}
            width={48}
            height={48}
            loading="lazy"
            placeholder="blur"
            blurDataURL={BluredBase64Image}
            className="size-8 object-contain max-md:size-6"
          />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3
            className="m-0 p-0 text-base font-medium leading-tight text-foreground"
            data-tina-field={tinaField(tinaPage, "title")}
          >
            {title}
          </h3>
          {popular && (
            // Plain string, not cn(): tailwind-merge doesn't know `xxs` is a
            // custom font size and would drop it as a text-colour conflict
            // with `text-brand`.
            <span className="flex-none self-center rounded-full bg-brand-subtle px-1.5 py-0.5 text-xxs font-bold uppercase leading-tight tracking-wider text-brand">
              Popular
            </span>
          )}
        </div>
        <p
          className="mt-1 line-clamp-2 text-xs leading-tight text-muted-foreground"
          title={description}
          data-tina-field={tinaField(tinaPage, "description")}
        >
          {description}
        </p>
      </div>

      <ChevronRight
        className="size-4 flex-none text-stroke-strong transition duration-150 group-hover:translate-x-1 group-hover:text-brand motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
        aria-hidden="true"
      />
    </a>
  );
};

export default ConsultingCard;
