"use client";

import classNames from "classnames";

type SidebarPanelProps = {
  title?: string;

  tinaFields: {
    title: string;
    description: string;
  };
  description: string;
  actionUrl?: string;
  actionText?: string;
};
export const SidebarPanel = ({
  title,
  description,
  tinaFields,
  actionUrl,
  actionText,
}: SidebarPanelProps) => {
  return (
    <>
      <div className="border-2 bg-gray-100 p-5">
        {title && <strong data-tina-field={tinaFields.title}>{title}</strong>}
        <p
          data-tina-field={tinaFields.description}
          className={classNames("pt-5", "w-f")}
        >
          {description}
        </p>
        {actionUrl && (
          <div className="flex justify-center pt-5">
            <a
              className="unstyled flex h-12 shrink-0 cursor-pointer items-center justify-center rounded bg-ssw-red px-5 text-center uppercase text-white no-underline hover:opacity-70 max-sm:my-5 sm:w-fit"
              href={actionUrl}
            >
              {actionText ?? "Learn more"}
            </a>
          </div>
        )}
      </div>
    </>
  );
};
