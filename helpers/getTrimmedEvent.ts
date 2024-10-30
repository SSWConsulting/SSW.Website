export const getTrimmedEvent = (events) =>
  events.eventsCalendarConnection.edges.map((edge) => ({
    ...edge.node,
    startDateTime: new Date(edge.node.startDateTime),
    endDateTime: new Date(edge.node.endDateTime),
    category: formatCategory(edge.node.category),
  })) || [];

export const formatCategory = (category: string): string => {
  {
    const categoryReplacements = {
      "Non-English Courses": "Other",
    };
    const lookup = categoryReplacements[category];

    return lookup ? lookup : category;
  }
};
