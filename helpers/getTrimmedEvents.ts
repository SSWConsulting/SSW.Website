export const getTrimmedEvent = (events) =>
  events?.pages.flat().flatMap((item) =>
    item.eventsCalendarConnection.edges.map((edge) => {
      return {
        ...edge.node,
        startDateTime: new Date(edge.node.startDateTime),
        endDateTime: new Date(edge.node.endDateTime),
        category: formatCategory(edge.node.category),
        url: `/events/${edge.node._sys.breadcrumbs.slice(-2).join("/")}`,
      };
    })
  ) || [];

export const formatCategory = (category: string): string => {
  {
    const categoryReplacements = {
      "Non-English Courses": "Other",
    };
    const lookup = categoryReplacements[category];

    return lookup ? lookup : category;
  }
};
