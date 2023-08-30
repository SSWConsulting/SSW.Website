import { Transition } from "@headlessui/react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { UtilityButton } from "../blocks";
import { LinkWrapper } from "../blocks/customImage";
import { componentRenderer } from "../blocks/mdxComponentRenderer";
import { VideoEmbed } from "../blocks/videoEmbed";
import { ClientDisplay } from "../company/clientList";
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
    return clients.filter(
      (client) => client.categories?.find((c) => c.category.id === category)
    );
  }, [clients, selected]);

  const groups: FilterGroupProps = {
    selected,
    setSelected,
    options: categories,
    allText: "All SSW Clients",
  };
  return (
    <FilterBlock groups={[groups]}>
      {clients.map((client, index) => {
        return (
          <Transition
            className="w-full"
            key={index}
            show={filteredClients?.some((c) => c.name === client.name)}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <h2>{client.name}</h2>
            <div className="">
              {client.logo && (
                <div className="float-left mr-4 block border-r-1 p-4">
                  <LinkWrapper link={client.logoUrl}>
                    <Image
                      src={client.logo || ""}
                      alt={client.name}
                      width={100}
                      height={100}
                    />
                  </LinkWrapper>
                </div>
              )}
              <div className="prose max-w-full prose-img:my-0">
                <TinaMarkdown
                  content={client.content}
                  components={componentRenderer}
                />
              </div>
            </div>
            {client.caseStudyUrl && (
              <UtilityButton
                size="small"
                link={client.caseStudyUrl}
                buttonText="Read the case study"
                noAnimate
              />
            )}
          </Transition>
        );
      })}
    </FilterBlock>
  );
};
