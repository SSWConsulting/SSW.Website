// Pure derivation for the /consulting index. Kept out of the page component so
// the non-obvious grouping rules below are unit-testable.

export const ALL_SERVICES = "All Services";
// Catch-all tag (content/consulting/tag/consulting.json). Pages with no tags
// at all default here rather than matching zero sections and vanishing.
export const OTHER_SERVICES = "Other Services";

export type ConsultingPage = {
  id: string;
  url: string;
  title: string;
  description?: string;
  logo?: string;
  popular?: boolean;
  tags: string[];
  // The raw Tina node, passed straight to tinaField() for click-to-edit.
  tinaPage: Record<string, unknown>;
};

export type ConsultingSection = {
  label: string;
  name: string;
  index: number;
  sectionId: string;
  pages: ConsultingPage[];
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

export const sectionIdFor = (name: string) => `consulting-${slugify(name)}`;

const mapPageUrl = (page) =>
  page.externalUrl ||
  page.page.id
    .replace("content/consultingv2", "/consulting")
    .replace("content", "")
    .replace(".mdx", "")
    .replace(".json", "");

// Two categories can point differently-titled cards at the same destination
// (e.g. "Azure AI" and "Microsoft Azure" both -> azure.mdx), so identity is the
// pair, not the url.
const pageKey = (page: Pick<ConsultingPage, "url" | "title">) =>
  `${page.url}|${page.title}`;

const buildTags = (node): Omit<ConsultingSection, "pages">[] =>
  node.sidebar
    ?.map((item, index) => ({
      label: item.label,
      name: item.tag?.name,
      index,
      sectionId: sectionIdFor(item.tag?.name || item.label || String(index)),
    }))
    // The Tina `tag` reference isn't required, and a row without one has no
    // name to match pages against — it would render as a filter that selects
    // nothing at all. Drop it rather than ship a dead sidebar entry.
    .filter((tag) => !!tag.name) || [];

const buildPages = (node): ConsultingPage[] => {
  const pages: ConsultingPage[] = [];

  node.categories?.forEach((category, categoryIndex) => {
    category.pages?.forEach((page, pageIndex) => {
      // No destination at all would crash mapPageUrl during prerender.
      if (!page.externalUrl && !page.page?.id) return;

      pages.push({
        id: `${categoryIndex}-${pageIndex}-${page.title}`,
        url: mapPageUrl(page),
        title: page.title,
        description: page.description,
        logo: page.logo,
        popular: page.popular,
        tags: page.tags?.length
          ? [ALL_SERVICES, ...page.tags.map((t) => t.tag?.name)]
          : [ALL_SERVICES, OTHER_SERVICES],
        tinaPage: page,
      });
    });
  });

  const unique = new Map<string, ConsultingPage>();
  pages.forEach((page) => {
    if (!unique.has(pageKey(page))) unique.set(pageKey(page), page);
  });
  return Array.from(unique.values());
};

// In the "All Services" view a page tagged under several sections should appear
// once, not once per section. Claim it into its SMALLEST matching section: every
// Content Management Systems page is also tagged Website Development, so
// claiming in sidebar order would hand all of them to the broader bucket and
// CMS's heading would disappear entirely.
const claimSharedPages = (
  contentSections: ConsultingSection[]
): ConsultingSection[] => {
  const bySize = [...contentSections].sort(
    (a, b) => a.pages.length - b.pages.length
  );
  const claimedBy = new Map<string, string>();
  bySize.forEach((section) => {
    section.pages.forEach((page) => {
      if (!claimedBy.has(pageKey(page)))
        claimedBy.set(pageKey(page), section.name);
    });
  });

  return contentSections
    .map((section) => ({
      ...section,
      pages: section.pages.filter(
        (page) => claimedBy.get(pageKey(page)) === section.name
      ),
    }))
    .filter((section) => section.pages.length > 0);
};

export const buildConsultingSections = (node) => {
  const pages = buildPages(node);
  const sections: ConsultingSection[] = buildTags(node).map((tag) => ({
    ...tag,
    pages: pages.filter((page) => page.tags.includes(tag.name)),
  }));
  const contentSections = sections.filter(
    (section) => section.name !== ALL_SERVICES
  );

  return {
    sections,
    contentSections,
    allViewSections: claimSharedPages(contentSections),
  };
};
