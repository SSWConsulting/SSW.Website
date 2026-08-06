import {
  ALL_SERVICES,
  OTHER_SERVICES,
  buildConsultingSections,
  sectionIdFor,
} from "@/helpers/consultingSections";

const tag = (name: string) => ({ tag: { name } });

const node = {
  sidebar: [
    { label: "All Services", tag: { name: ALL_SERVICES } },
    { label: "Website Development", tag: { name: "Website Development" } },
    { label: "Content Management Systems", tag: { name: "CMS" } },
    { label: "Other Services", tag: { name: OTHER_SERVICES } },
    { label: "Row an editor left untagged" },
  ],
  categories: [
    {
      pages: [
        {
          title: "Umbraco",
          externalUrl: "/consulting/umbraco",
          tags: [tag("Website Development"), tag("CMS")],
        },
        {
          title: "Web Apps",
          externalUrl: "/consulting/web-apps",
          tags: [tag("Website Development")],
        },
        { title: "Untagged Thing", externalUrl: "/consulting/untagged" },
        { title: "No Destination" },
      ],
    },
  ],
};

const section = (sections, name: string) =>
  sections.find((s) => s.name === name);
const titles = (s) => s?.pages.map((p) => p.title) ?? [];

describe("buildConsultingSections", () => {
  const { sections, contentSections, allViewSections } =
    buildConsultingSections(node);

  test("drops entries with no destination", () => {
    const all = section(sections, ALL_SERVICES);
    expect(titles(all)).not.toContain("No Destination");
    expect(titles(all)).toHaveLength(3);
  });

  test("untagged pages fall back to Other Services", () => {
    expect(titles(section(sections, OTHER_SERVICES))).toEqual([
      "Untagged Thing",
    ]);
  });

  test("the All Services tag is not itself a content section", () => {
    expect(section(contentSections, ALL_SERVICES)).toBeUndefined();
  });

  test("sidebar rows with no tag are dropped, not rendered as dead filters", () => {
    // Selecting one would set the filter to undefined and blank the page.
    expect(sections.every((s) => !!s.name)).toBe(true);
    expect(sections.map((s) => s.label)).not.toContain(
      "Row an editor left untagged"
    );
  });

  test("filtering a section shows every page tagged with it", () => {
    // Umbraco is tagged both, so it appears under each when filtered directly.
    expect(titles(section(contentSections, "Website Development"))).toEqual([
      "Umbraco",
      "Web Apps",
    ]);
    expect(titles(section(contentSections, "CMS"))).toEqual(["Umbraco"]);
  });

  test("the All view gives a shared page to its smallest section", () => {
    // The regression this guards: claiming in sidebar order would hand Umbraco
    // to Website Development and leave CMS empty, so its heading would vanish.
    expect(titles(section(allViewSections, "CMS"))).toEqual(["Umbraco"]);
    expect(titles(section(allViewSections, "Website Development"))).toEqual([
      "Web Apps",
    ]);
  });

  test("the All view shows each page exactly once", () => {
    const shown = allViewSections.flatMap((s) => s.pages.map((p) => p.title));
    expect(shown).toHaveLength(new Set(shown).size);
    expect(shown.sort()).toEqual(["Umbraco", "Untagged Thing", "Web Apps"]);
  });
});

describe("sectionIdFor", () => {
  test("matches the anchors hardcoded in content/megamenu/menu.json", () => {
    expect(sectionIdFor("Platform Development")).toBe(
      "consulting-platform-development"
    );
    expect(sectionIdFor("Cloud and Infrastructure")).toBe(
      "consulting-cloud-and-infrastructure"
    );
  });
});
