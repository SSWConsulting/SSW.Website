"use client";

import { Transition } from "@headlessui/react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { BsArrowRightCircle } from "react-icons/bs";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { componentRenderer } from "../blocks/mdxComponentRenderer";
import { UtilityButton } from "../button/utilityButton";
import { ClientDisplay } from "../company/clientList";
import { CustomLink } from "../customLink";
import { FilterBlock } from "./FilterBlock";
import { type FilterGroupProps } from "./FilterGroup";

type ClientsFilterProps = {
  clients: ClientDisplay[];
  categories: string[];
};

export const ClientsFilter = ({ clients, categories }: ClientsFilterProps) => {
  const [selected, setSelected] = useState(-1);

  const filteredClients = useMemo(() => {
    if (selected === -1) return clients;

    const category = categories[selected];
    return clients.filter((client) =>
      client.categories?.find((c) => c.category?.name === category)
    );
  }, [clients, selected, categories]);

  const groups: FilterGroupProps = {
    selected,
    setSelected,
    options: categories.map((category) => ({
      label: category,
      count: clients.filter((client) =>
        client.categories?.find((c) => c.category?.name === category)
      ).length,
    })),
    allText: "All SSW Clients",
  };

  return (
    <FilterBlock groups={[groups]}>
      {clients.map((client, index) => {
        return (
          <Transition
            as={"div"}
            key={index}
            show={filteredClients?.some((c) => c.name === client.name)}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <h2 className="mb-4 mt-0">{client.name}</h2>
            <div className="my-8">
              {client.logo && (
                <div className="float-left mb-2 mr-4 block border-r-1 p-4">
                  <CustomLink href={client.logoUrl}>
                    <Image
                      src={client.logo || ""}
                      alt={client.name}
                      width={100}
                      height={100}
                    />
                  </CustomLink>
                </div>
              )}
              <div className="prose max-w-full prose-img:my-0">
                <TinaMarkdown
                  content={client.content}
                  components={componentRenderer}
                />
              </div>
            </div>
            <div className="flex flex-row">
              {client.caseStudyUrl && (
                <UtilityButton
                  className="clear-both mr-4 inline"
                  size="small"
                  removeTopMargin
                  link={client.caseStudyUrl}
                  buttonText={
                    <>
                      Read the case study
                      <BsArrowRightCircle className="ml-1 inline" />
                    </>
                  }
                  animated
                />
              )}
            </div>
            <hr className="my-8" />
          </Transition>
        );
      })}
    </FilterBlock>
  );
};
