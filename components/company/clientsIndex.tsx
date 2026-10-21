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

// Reuses the homepage's logo carousel block.
const homeLogoCarousel = homePage.blocks.find(
  (block) => block._template === "v3LogoCarousel"
);

export const ClientsIndex = ({ company, clientList, relativePath }) => {
  const clients: ClientDisplay[] = clientList?.clients ?? [];
  const categories: string[] = (clientList?.categories ?? [])
    .map((c) => c?.category?.name)
    .filter((name) =>
      clients.some((client) =>
        client?.categories?.some((c) => c?.category?.name === name)
      )
    );

  return (
    // min-h-screen: PageLayout's <main> is bg-white and would show below.
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
          <ClientsFilter clients={clients} categories={categories} />
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
