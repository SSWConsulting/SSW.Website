import Image from "next/image";
import { CustomLink } from "../customLink";

export const PageCard = ({ page }) => {
  return (
    <div className="relative bg-white p-3 hover:bg-gray-50">
      <div className="flex">
        <div className="shrink-0">
          {page.logo && (
            <Image
              className="mr-4 aspect-square size-14 border-1 border-gray-100 md:size-28"
              height={115}
              width={115}
              src={page.logo}
              alt={`${page.title} logo`}
            />
          )}
        </div>
        <div className="min-w-0 flex-1">
          {page.url && (
            <CustomLink href={page.url} className="unstyled">
              <span className="absolute inset-0" aria-hidden="true" />
              <h3 className="mb-2 mt-0 text-lg text-sswRed">{page.name}</h3>
              <p className="text-sm text-black">{page.description}</p>
            </CustomLink>
          )}
        </div>
      </div>
    </div>
  );
};
