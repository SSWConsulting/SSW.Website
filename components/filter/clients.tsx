"use client";

import { useMemo, useState } from "react";
import { FiArrowUpRight, FiSearch } from "react-icons/fi";
import {
  clientIndustries,
  clientSearchText,
  matchesClientFilters,
  orderClients,
} from "@/helpers/clients";
import { ClientCard } from "../company/clientCard";
import { CLIENT_SERVICES, type ClientDisplay } from "../company/clientList";
import { ClientStoryDialog } from "../company/clientStoryDialog";
import { CustomLink } from "../customLink";
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
  const [query, setQuery] = useState("");
  const [service, setService] = useState(ALL_SERVICES);
  const [openClient, setOpenClient] = useState<ClientDisplay | null>(null);

  const ordered = useMemo(() => orderClients(clients), [clients]);

  // Only the services some client actually has, in the schema's order.
  const services = useMemo(
    () => CLIENT_SERVICES.filter((s) => clients.some((c) => c.service === s)),
    [clients]
  );

  const searchText = useMemo(
    () => new Map(clients.map((client) => [client, clientSearchText(client)])),
    [clients]
  );

  const filtered = useMemo(() => {
    const filters = {
      industry: selected === NO_SELECTION ? undefined : categories[selected],
      service: service === ALL_SERVICES ? undefined : service,
      query,
    };
    return ordered.filter((client) =>
      matchesClientFilters(client, searchText.get(client) ?? "", filters)
    );
  }, [ordered, selected, categories, service, query, searchText]);

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

  const isFiltered =
    selected !== NO_SELECTION || service !== ALL_SERVICES || !!query.trim();
  const reset = () => {
    setSelected(NO_SELECTION);
    setService(ALL_SERVICES);
    setQuery("");
  };

  return (
    <>
      <StickySidebarLayout
        title="Browse by industry"
        titleAs="h3"
        titleClassName="text-sm font-semibold max-md:text-sm xl:text-sm"
        sidebar={
          // 20+ industries outgrow the viewport, so the sticky list scrolls
          // on its own on desktop (mobile is a horizontal chip row).
          <div className="md:-mx-1 md:mt-4 md:max-h-sidebar-scroll md:overflow-y-auto md:px-1">
            <FilterNav label="Client industries" {...group} />
          </div>
        }
        promo={
          <div className="border-t-0.75 border-hairline pt-6 text-sm">
            <p className="m-0 text-muted-foreground">
              Have a similar challenge?
            </p>
            <CustomLink
              href="/company/contact-us"
              className="unstyled mt-1 inline-flex items-center gap-1.5 font-semibold text-foreground no-underline hover:text-brand"
            >
              Let&rsquo;s work on it
              <FiArrowUpRight aria-hidden className="size-4" />
            </CustomLink>
          </div>
        }
      >
        <div className="flex gap-3 max-sm:flex-col">
          <label className="relative min-w-0 flex-1">
            <span className="sr-only">Search client stories</span>
            <FiSearch
              aria-hidden
              className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search clients, industries or challenges"
              className={`${controlClassName} w-full pl-11 pr-4 placeholder:text-muted-foreground`}
            />
          </label>
          {services.length > 0 && (
            <label className="flex-none">
              <span className="sr-only">Filter by service</span>
              <select
                value={service}
                onChange={(event) => setService(event.target.value)}
                className={`${controlClassName} w-full px-4 sm:w-52`}
              >
                <option value={ALL_SERVICES}>All services</option>
                {services.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          )}
        </div>

        <div className="mb-6 mt-4 flex items-center gap-4 text-sm text-muted-foreground">
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
