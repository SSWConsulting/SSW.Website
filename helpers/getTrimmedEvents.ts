export const buildEventUrl = (node: {
  slug?: string | null;
  _sys: { filename: string; breadcrumbs: string[] };
}): string => {
  const folderYear = node._sys.breadcrumbs.at(-2);
  const segment = (node.slug || node._sys.filename).toLowerCase();
  return folderYear ? `/events/${folderYear}/${segment}` : `/events/${segment}`;
};

export const mapEventEdge = (edge) => ({
  ...edge.node,
  startDateTime: new Date(edge.node.startDateTime),
  endDateTime: new Date(edge.node.endDateTime),
  category: formatCategory(edge.node.category),
  url: buildEventUrl(edge.node),
});

export const getTrimmedEvent = (events) =>
  events?.pages
    .flat()
    .flatMap((item) => item.eventsCalendarConnection.edges.map(mapEventEdge)) ||
  [];

export const formatCategory = (category: string): string => {
  {
    const categoryReplacements = {
      "Non-English Courses": "Other",
    };
    const lookup = categoryReplacements[category];

    return lookup ? lookup : category;
  }
};
