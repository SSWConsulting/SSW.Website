"use client";

import { V3LogoCarousel } from "@/components/blocks/v3/logoCarousel/logoCarousel";
import { ClientsFilter } from "@/components/filter/clients";
import { HomeThemeShell } from "@/components/layout/homeTheme";
import { sidebarPageContainer } from "@/components/layout/stickySidebar";
import { removeExtension } from "@/services/client/utils.service";
import { Breadcrumbs } from "app/components/breadcrumb";
import { tinaField } from "tinacms/dist/react";
import homePage from "../../content/pagesv2/home.json";
import type { ClientDisplay } from "./clientList";
import { ClientsClosing } from "./clientsClosing";
import { CLIENT_STORIES_ID, ClientsHero } from "./clientsHero";

// The homepage's client logo carousel, reused as is: same block, same logos.
const homeLogoCarousel = homePage.blocks.find(
  (block) => block._template === "v3LogoCarousel"
);

// The themed /company/clients page, in the style of /events and /consulting.
// Rendered by the generic company page whenever its body holds a Client List
// block; every other company page keeps the classic layout.
export const ClientsIndex = ({ company, clientList, relativePath }) => {
  const clients: ClientDisplay[] = clientList?.clients ?? [];
  // Industries with no clients yet would only be empty filters.
  const categories: string[] = (clientList?.categories ?? [])
    .map((c) => c?.category?.name)
    .filter((name) =>
      clients.some((client) =>
        client?.categories?.some((c) => c?.category?.name === name)
      )
    );

  return (
    // min-h-screen: PageLayout's <main> is always bg-white, so any shortfall
    // would show as a white band under the themed content.
    <HomeThemeShell className="min-h-screen bg-sunken-glow">
      <div className={sidebarPageContainer}>
        <div className="min-h-12">
          <Breadcrumbs
            path={removeExtension(relativePath)}
            title={company.seo?.title}
            seoSchema={company.seo}
          />
        </div>

        <div className="mt-6 md:mt-10">
          <ClientsHero company={company} />
        </div>

        {homeLogoCarousel && (
          <div className="mt-16">
            <V3LogoCarousel data={homeLogoCarousel} />
          </div>
        )}

        <section
          id={CLIENT_STORIES_ID}
          className="mt-16 scroll-mt-28 md:mt-20"
          data-tina-field={tinaField(clientList)}
        >
          <p className="m-0 text-xs font-semibold uppercase tracking-widest text-brand">
            Explore our work
          </p>
          <h2 className="m-0 mt-4 p-0 text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl">
            Good software. Real-world impact.
          </h2>
          <p className="m-0 mt-3 text-muted-foreground">
            Find inspiration in the challenges we&rsquo;ve solved together.
          </p>

          <div className="mt-10">
            <ClientsFilter clients={clients} categories={categories} />
          </div>
        </section>

        {company.showTechUpgradeBlock && (
          <div className="mt-20">
            <ClientsClosing />
          </div>
        )}
      </div>
    </HomeThemeShell>
  );
};
