const formatEvent = (event) => {
  const url = event.url && fixRelativeUrl(event.url);
  return {
    Presenter: event.presenterName,
    Url: {
      Description: event.title, // this is alt text for the link, ask matt what he wants to do for it
      Url: url,
    },
    title: event.title,
    Thumbnail: {
      Url: fixRelativeUrl(event.thumbnail),
      Description: event.thumbnailDescription,
    },
    PresenterProfileUrl:
      event.presenterProfileUrl && fixRelativeUrl(event.presenterProfileUrl),
    StartDateTime: event.startDateTime,
    EndDateTime: event.endDateTime,
    StartShowBannerDateTime: event.startShowBannerDateTime,
    EndShowBannerDateTime: event.endShowBannerDateTime,
    LiveStreamUrl: event.youTubeId
      ? `https://www.youtube.com/watch?v=${event.youTubeId}`
      : null,
    CalendarType: event.calendarType,
    City: event.city,
    Enabled: event.enabled,
    EventShortDescription: descriptionToHTML(event.description),
    ShowOnPowerSessions: "No",
    NoteInternal: event.internalNote,
    HasVideo: event.youTubeId ? "Yes" : "No",
    YouTubeId: event.youTubeId,
    PresenterDescription:
      event.presenterList && event.presenterListlength > 0
        ? event.presenterList[0].presenter.about
        : null,
  };
};
export const getEventsWithClient = async (
  eventClient,
  presenterName: string | undefined,
  top
) => {
  if (top) {
    top = parseInt(top);
  }
  const events = [];
  // TODO: remove client side after fixing events with multiple presenters in the name
  for (const event of eventClient.data.eventsCalendarConnection.edges) {
    if (
      !presenterName ||
      (event.node.presenterName &&
        event.node.presenterName
          .toLowerCase()
          .includes(presenterName.toLowerCase()))
    ) {
      events.push(formatEvent(event.node));
    }

    if (events.length === (top || 10)) {
      break;
    }
  }
  return events;
};

const fixRelativeUrl = (url: string) => {
  if (url.startsWith("/")) {
    return `https://ssw.com.au${url}`;
  }
  return url;
};

const descriptionToHTML = (description) => {
  let plainText = "";
  description.children.forEach((paragraph) => {
    paragraph.children.forEach((textNode) => {
      plainText += `<p>${textNode.text}</p>`;
    });
  });
  return plainText;
};
