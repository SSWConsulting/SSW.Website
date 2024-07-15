"use client";

type SidebarPanelProps = {
  title?: string;
  description: string;
  actionUrl?: string;
  actionText?: string;
};

const SidebarPanel = ({
  title,
  description,
  actionUrl,
  actionText }: SidebarPanelProps) => {

  return (
    <>
      <div className="border-2 bg-gray-100 px-5 py-5">
        {!!title && <strong>{title}</strong>}
        <p className="pt-5">{description}</p>
        {!!actionUrl &&
        <div className="flex justify-center pt-5">
          <a
            className="unstyled no-underline flex h-12 w-80 shrink-0 cursor-pointer items-center justify-center uppercase text-white rounded bg-ssw-red px-5 hover:opacity-70 max-sm:my-5 sm:w-fit"
            href={actionUrl}>
            {actionText ?? 'Learn more'}
          </a>
        </div>
        }
      </div>
    </>
  );
};

export default SidebarPanel;
