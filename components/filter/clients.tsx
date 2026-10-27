"use client";

import { useMemo, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  clientIndustries,
  matchesClientFilters,
  orderClients,
} from "@/helpers/clients";
import { ClientCard } from "../company/clientCard";
import { CLIENT_SERVICES, type ClientDisplay } from "../company/clientList";
import { ClientStoryDialog } from "../company/clientStoryDialog";
import { useHomeTheme } from "../layout/homeTheme";
import { StickySidebarLayout } from "../layout/stickySidebar";
import { NO_SELECTION } from "./FilterBlock";
import { type FilterGroupProps } from "./FilterGroup";
import { FilterNav } from "./FilterNav";

type ClientsFilterProps = {
  clients: ClientDisplay[];
  categories: string[];
};

const ALL_SERVICES = "all";

const controlClassName =
  "h-11 rounded-control border-0.75 border-stroke-weak bg-card text-sm text-foreground transition-colors focus-visible:border-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand dark:border-hairline";

export const ClientsFilter = ({ clients, categories }: ClientsFilterProps) => {
  const [selected, setSelected] = useState(NO_SELECTION);
  const [service, setService] = useState(ALL_SERVICES);
  const [openClient, setOpenClient] = useState<ClientDisplay | null>(null);

  const ordered = useMemo(() => orderClients(clients), [clients]);

  const services = useMemo(
    () => CLIENT_SERVICES.filter((s) => clients.some((c) => c.service === s)),
    [clients]
  );

  const filtered = useMemo(() => {
    const filters = {
      industry: selected === NO_SELECTION ? undefined : categories[selected],
      service: service === ALL_SERVICES ? undefined : service,
    };
    return ordered.filter((client) => matchesClientFilters(client, filters));
  }, [ordered, selected, categories, service]);

  const group: FilterGroupProps = {
    selected,
    setSelected,
    options: categories.map((category) => ({
      label: category,
      count: clients.filter((client) =>
        clientIndustries(client).includes(category)
      ).length,
    })),
    allText: "All industries",
  };

  const isFiltered = selected !== NO_SELECTION || service !== ALL_SERVICES;
  const reset = () => {
    setSelected(NO_SELECTION);
    setService(ALL_SERVICES);
  };

  return (
    <>
      <StickySidebarLayout
        title="Browse by industry"
        titleAs="h2"
        titleClassName="text-sm font-semibold max-md:text-sm xl:text-sm"
        sidebar={
          <div className="md:mt-4">
            <FilterNav label="Client industries" {...group} />
          </div>
        }
      >
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <p className="m-0" aria-live="polite">
              {filtered.length} {filtered.length === 1 ? "story" : "stories"}
              {selected !== NO_SELECTION && ` in ${categories[selected]}`}
            </p>
            {isFiltered && (
              <button
                type="button"
                onClick={reset}
                className="unstyled font-semibold text-foreground underline underline-offset-4 hover:text-brand"
              >
                Clear filters
              </button>
            )}
          </div>
          {services.length > 0 && (
            <ServiceMenu
              services={services}
              value={service}
              onChange={setService}
            />
          )}
        </div>

        {filtered.length > 0 ? (
          <ul className="m-0 grid list-none grid-cols-1 gap-5 p-0 md:grid-cols-2">
            {filtered.map((client) => (
              <li key={client.name}>
                <ClientCard
                  client={client}
                  onOpen={() => setOpenClient(client)}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-card border-0.75 border-dashed border-stroke-weak p-10 text-center dark:border-hairline">
            <p className="m-0 text-foreground">No stories match.</p>
            <button
              type="button"
              onClick={reset}
              className="unstyled mt-2 text-sm font-semibold text-brand underline underline-offset-4"
            >
              Clear filters
            </button>
          </div>
        )}
      </StickySidebarLayout>

      <ClientStoryDialog
        client={openClient}
        onClose={() => setOpenClient(null)}
      />
    </>
  );
};

const ALL_SERVICES_LABEL = "All SSW Services";

const serviceItem =
  "cursor-pointer py-2 text-foreground focus:bg-card-hover focus:text-foreground data-[state=checked]:font-semibold";

const ServiceMenu = ({
  services,
  value,
  onChange,
}: {
  services: string[];
  value: string;
  onChange: (service: string) => void;
}) => {
  // The menu renders in a portal, outside the themed shell, so it takes the
  // theme class itself.
  const { isDark } = useHomeTheme();
  const label = value === ALL_SERVICES ? ALL_SERVICES_LABEL : value;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={`Filter by service: ${label}`}
          className={cn(
            controlClassName,
            "unstyled flex w-52 flex-none items-center justify-between gap-2 px-4 text-left data-[state=open]:border-brand"
          )}
        >
          <span className="truncate">{label}</span>
          <FiChevronDown
            aria-hidden
            className="size-4 flex-none text-muted-foreground"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className={cn(
          isDark && "dark",
          "min-w-dropdown-trigger rounded-control border-0.75 border-hairline bg-card p-1 text-foreground shadow-lg"
        )}
      >
        <DropdownMenuRadioGroup value={value} onValueChange={onChange}>
          <DropdownMenuRadioItem value={ALL_SERVICES} className={serviceItem}>
            {ALL_SERVICES_LABEL}
          </DropdownMenuRadioItem>
          {services.map((service) => (
            <DropdownMenuRadioItem
              key={service}
              value={service}
              className={serviceItem}
            >
              {service}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
