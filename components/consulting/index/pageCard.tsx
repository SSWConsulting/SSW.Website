import { useFilterContext } from "@/app/consulting";
import { BluredBase64Image } from "@/helpers/images";
import { motion } from "framer-motion";
import Image from "next/image";
import { tinaField } from "tinacms/dist/react";
import { CustomLink } from "../../customLink";

export const PageCard = ({ page, category, pageIndex }) => {
  const { filterDidChange } = useFilterContext();

  return (
    <motion.div
      key={pageIndex}
      transition={{
        type: "spring",
        damping: 20,
        stiffness: 300,
      }}
      layout
      initial={
        filterDidChange && {
          opacity: 0,
          filter: "blur(5px)",
          translateY: "50px",
        }
      }
      animate={
        filterDidChange && {
          opacity: 1,
          filter: "blur(0px)",
          translateY: "0px",
        }
      }
      exit={{ opacity: 0, translateY: "50px", filter: "blur(5px)" }}
      className="relative bg-white p-3 hover:bg-gray-50"
    >
      <div className="flex">
        <div className="shrink-0">
          {page.logo && (
            <Image
              className="mr-4 aspect-square size-14 border-1 border-gray-100 p-2 md:size-28"
              height={115}
              width={115}
              src={page.logo}
              alt={`${page.title} logo`}
              loading="lazy"
              placeholder="blur"
              blurDataURL={BluredBase64Image}
            />
          )}
        </div>
        <div
          className="min-w-0 flex-1"
          data-tina-field={tinaField(category?.pages[pageIndex], "description")}
        >
          <CustomLink href={page.url} className="unstyled">
            <span className="absolute inset-0" aria-hidden="true" />
            <h3 className="mb-2 mt-0 text-lg text-sswRed">{page.title}</h3>
            <p className="text-sm text-black">{page.description}</p>
          </CustomLink>
        </div>
      </div>
    </motion.div>
  );
};
