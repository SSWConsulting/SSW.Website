import { Transition } from "@headlessui/react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { componentRenderer } from "../blocks/mdxComponentRenderer";
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
            <div>
              <div className="float-left mr-4 border-r-1 p-8">
                <Image
                  src={client.logo || ""}
                  alt={client.name}
                  width={100}
                  height={100}
                />
              </div>
              <TinaMarkdown
                content={client.content}
                components={componentRenderer}
              />
            </div>
          </Transition>
        );
      })}
    </FilterBlock>
  );
};
