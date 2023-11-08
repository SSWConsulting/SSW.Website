import Image from "next/image";
import Link from "next/link";

export const PageCard = ({ page }) => {
  return (
    <div className="relative bg-white p-3 hover:bg-gray-50">
      <div className="flex">
        <div className="shrink-0">
          {page.logo && (
            <Image
              className="mr-4 aspect-square h-14 w-14 border-1 border-gray-100 md:h-28 md:w-28"
              height={115}
              width={115}
              src={page.logo}
              alt={`${page.title} logo`}
            />
          )}
        </div>
        <div className="min-w-0 flex-1">
          {page.url && (
            <Link href={page.url} className="unstyled" target="_blank">
              <span className="absolute inset-0" aria-hidden="true" />
              <h3 className="mb-2 mt-0 text-lg text-sswRed">{page.name}</h3>
              <p className="text-sm text-black">{page.description}</p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
