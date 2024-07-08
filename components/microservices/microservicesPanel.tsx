"use client";

type MicroservicesPanelProps = {
  title?: string;
  description: string;
  url?: string;
};

const MicroservicesPanel = ({
  title,
  description,
  url,
}: MicroservicesPanelProps) => {
  return (
    <>
      <div className="border-2 bg-gray-100 p-5">
        {!!title && <strong>{title}</strong>}
        <p className="pt-5">{description}</p>
        {!!url && (
          <div className="flex justify-center pt-5">
            <a
              className="unstyled flex h-12 w-80 shrink-0 cursor-pointer items-center justify-center rounded bg-ssw-red px-5 uppercase text-white hover:opacity-70 max-sm:my-5 sm:w-fit"
              href={url}
            >
              Learn more
            </a>
          </div>
        )}
      </div>
    </>
  );
};

export default MicroservicesPanel;
