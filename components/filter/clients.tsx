import { Transition } from "@headlessui/react";
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
    return clients.filter((client) => client.category === category);
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
            key={index}
            show={filteredClients.some((c) => c.name === client.name)}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <h2>{client.name}</h2>
            <TinaMarkdown
              content={client.content}
              components={componentRenderer}
            />
          </Transition>
        );
      })}
    </FilterBlock>
  );
};
