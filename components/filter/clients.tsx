import { useMemo, useState } from "react";
import { ClientDisplay } from "../company/clientList";
import { FilterBlock } from "./FilterBlock";
import { type FilterGroupProps } from "./FilterGroup";

type ClientsFilterProps = {
  clients: ClientDisplay[];
};

export const ClientsFilter = ({ clients }: ClientsFilterProps) => {
  const [selected, setSelected] = useState(-1);

  const filteredClients = useMemo(() => {
    return clients;
  }, [clients, selected]);

  const categories: FilterGroupProps = {
    selected,
    setSelected,
    options: ["Test, test, Testt"],
    allText: "All SSW Clients",
  };
  return (
    <FilterBlock groups={[categories]}>
      {filteredClients.map((client) => {
        return <p>{JSON.stringify(client)}</p>;
      })}
    </FilterBlock>
  );
};
