"use client";

import { componentRenderer } from "@/components/blocks/mdxComponentRenderer";
import { productTagChip } from "@/components/products/shared";
import { clientTags } from "@/helpers/clients";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Suspense, useEffect, useRef } from "react";
import { FiX } from "react-icons/fi";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import type { ClientDisplay } from "@/helpers/clientTypes";

// The typography plugin hard-codes sswBlack text and sswRed h2s, which
// `dark:prose-invert` can't override, so each element gets a theme token.
const themedProse = [
  "prose max-w-none font-light text-muted-foreground prose-img:my-0",
  "prose-p:text-muted-foreground prose-li:text-muted-foreground",
  "prose-headings:text-foreground prose-strong:text-foreground prose-a:text-brand",
].join(" ");

export const ClientStoryDialog = ({
  client,
  onClose,
}: {
  client: ClientDisplay | null;
  onClose: () => void;
}) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (client && !dialog.open) dialog.showModal();
    if (!client && dialog.open) dialog.close();
  }, [client]);

  return (
    <dialog
      ref={ref}
      aria-labelledby="client-story-title"
      onClose={onClose}
      // A click on the backdrop lands on the <dialog> itself.
      onClick={(event) => event.target === ref.current && onClose()}
      className="m-auto max-h-dialog w-modal max-w-3xl overflow-y-auto rounded-card border-0.75 border-hairline bg-background p-0 text-foreground backdrop:bg-black/60 backdrop:backdrop-blur-sm"
    >
      {client && (
        <div className="relative p-6 md:p-8">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="unstyled absolute right-4 top-4 flex size-9 items-center justify-center rounded-full border-0.75 border-hairline text-foreground hover:border-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            <FiX aria-hidden className="size-4" />
          </button>

          {client.logo && (
            <span className="flex h-16 w-36 items-center justify-center rounded-lg border-0.75 border-hairline bg-white p-3">
              <Image
                src={client.logo}
                alt={`${client.name} logo`}
                width={144}
                height={64}
                className="size-full object-contain"
              />
            </span>
          )}
          <h2
            id="client-story-title"
            data-tina-field={tinaField(
              client,
              client.headline ? "headline" : "name"
            )}
            className="m-0 mt-5 p-0 text-2xl font-semibold leading-tight tracking-tight text-foreground"
          >
            {client.headline || client.name}
          </h2>
          <ul className="m-0 mt-3 flex list-none flex-wrap gap-1.5 p-0">
            {clientTags(client).map((tag) => (
              <li key={tag} className={productTagChip}>
                {tag}
              </li>
            ))}
          </ul>
          <div
            data-tina-field={tinaField(client, "content")}
            className={cn(themedProse, "mt-5")}
          >
            {/* The embeds are lazy: without this boundary the first open
                suspends the page and scrolls the reader back to the top. */}
            <Suspense fallback={null}>
              <TinaMarkdown
                content={client.content}
                components={componentRenderer}
              />
            </Suspense>
          </div>
          {client.logoUrl && (
            <a
              href={client.logoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
            >
              Visit {client.name} ↗
            </a>
          )}
        </div>
      )}
    </dialog>
  );
};
