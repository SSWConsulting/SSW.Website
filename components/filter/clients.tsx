import { useMemo, useState } from "react";
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
    return clients;
  }, [clients, selected]);

  const groups: FilterGroupProps = {
    selected,
    setSelected,
    options: categories,
    allText: "All SSW Clients",
  };
  return (
    <FilterBlock groups={[groups]}>
      {filteredClients.map((client, index) => {
        return <p key={index}>{JSON.stringify(client)}</p>;
      })}
    </FilterBlock>
  );
};
