"use client";

import { useMemo, useState } from "react";
import { FiCheck, FiChevronDown } from "react-icons/fi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  clientIndustryOptions,
  matchesClientFilters,
  orderClients,
} from "@/helpers/clients";
import { ClientCard } from "../company/clientCard";
import { CLIENT_SERVICES, type ClientDisplay } from "@/helpers/clientTypes";
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
  const industryOptions = useMemo(
    () => clientIndustryOptions(clients, categories),
    [clients, categories]
  );
  const industry =
    selected === NO_SELECTION ? undefined : industryOptions[selected]?.label;
  const industryClients = useMemo(
    () =>
      ordered.filter((client) =>
        matchesClientFilters(client, {
          industry,
        })
      ),
    [ordered, industry]
  );

  const services = useMemo(
    () =>
      CLIENT_SERVICES.filter((s) => clients.some((c) => c.service === s)).map(
        (name) => ({
          name,
          count: industryClients.filter((client) => client.service === name)
            .length,
        })
      ),
    [clients, industryClients]
  );

  const filtered = useMemo(() => {
    const filters = {
      service: service === ALL_SERVICES ? undefined : service,
    };
    return industryClients.filter((client) =>
      matchesClientFilters(client, filters)
    );
  }, [industryClients, service]);

  const group: FilterGroupProps = {
    selected,
    setSelected,
    options: industryOptions,
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
              {industry && ` in ${industry}`}
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
              total={industryClients.length}
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
  "cursor-pointer py-2 text-foreground hover:bg-sswRed/10 hover:text-brand focus:bg-sswRed/10 focus:text-brand data-[highlighted]:bg-sswRed/10 data-[highlighted]:text-brand data-[state=checked]:font-semibold data-[state=checked]:text-brand";

const ServiceMenu = ({
  services,
  total,
  value,
  onChange,
}: {
  services: { name: string; count: number }[];
  total: number;
  value: string;
  onChange: (service: string) => void;
}) => {
  // The portalled menu needs its own theme class outside the themed shell.
  const { isDark } = useHomeTheme();
  const label = value === ALL_SERVICES ? ALL_SERVICES_LABEL : value;
  const count =
    value === ALL_SERVICES
      ? total
      : (services.find((service) => service.name === value)?.count ?? 0);

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={`Filter by service: ${label} (${count})`}
          className={cn(
            controlClassName,
            "unstyled group flex w-52 flex-none items-center justify-between gap-2 px-4 text-left hover:border-brand hover:bg-card-hover data-[state=open]:border-brand dark:hover:border-brand"
          )}
        >
          <span className="flex min-w-0 items-center gap-1">
            <span className="truncate">{label}</span>
            <span className="flex-none">({count})</span>
          </span>
          <FiChevronDown
            aria-hidden
            className="size-4 flex-none text-muted-foreground transition-colors group-hover:text-brand"
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
          <DropdownMenuRadioItem
            value={ALL_SERVICES}
            className={serviceItem}
            indicator={<FiCheck aria-hidden className="size-4 text-brand" />}
          >
            {ALL_SERVICES_LABEL} ({total})
          </DropdownMenuRadioItem>
          {services.map((service) => (
            <DropdownMenuRadioItem
              key={service.name}
              value={service.name}
              className={serviceItem}
              indicator={<FiCheck aria-hidden className="size-4 text-brand" />}
            >
              {service.name} ({service.count})
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
