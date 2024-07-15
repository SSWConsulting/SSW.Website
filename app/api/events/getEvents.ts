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
    SessionTitle: null,
    SessionTitleAnchor: null,
    Abstract: null,
    EventShortDescription: descriptionToPlainText(event.description),
    EventDescription: null,
    ShowOnPowerSessions: "No",
    NoteInternal: event.internalNote,
    HasVideo: event.youTubeId ? "Yes" : "No",
    Location: null,
    Geolocation: null,
    EventDate: null,
    EndDate: null,
    Description: null,
    fAllDayEvent: null,
    fRecurrence: null,
    ParticipantsPickerId: null,
    ParticipantsPickerStringId: null,
    Category: event.categoryName,
    FreeBusy: null,
    Overbook: null,
    BannerUrl: null,
    YouTubeId: event.youTubeId,
    GitHubURL: null,
    EvalFormURL: null,
    PresenterDescription:
      event.presenterList && event.presenterListlength > 0
        ? event.presenterList[0].presenter.about
        : null,
    InternalPresentersId: null,
    InternalPresentersStringId: null,
    ExternalPresentersId: {
      __metadata: {
        type: "Collection(Edm.Int32)",
      },
      results: [],
    },
    BannerImageUrl: null,
    SSW_DelayedLiveStreamStart: null,
    SSW_LiveStreamDelayMinutes: null,
    ContentTypeId: "0x010000A22E3C9C846F4DB3D9F2DD20750A61",
    ComplianceAssetId: null,
    OData__ColorTag: null,
    Trailer_x0020_URL: null,
    HostedAtSSW: event.hostedAtSsw,
    ID: 0,
    Modified: null,
    Created: null,
    AuthorId: null,
    EditorId: null,
    OData__UIVersionString: null,
    Attachments: false,
    GUID: null,
  };
};

export const getEventsWithClient = async (eventClient, presenterName) => {
  const events = [];
  // TODO: remove client side after fixing events with multiple presenters in the name
  for (let event of eventClient.data.eventsCalendarConnection.edges) {
    if (
      event.node.presenterName &&
      event.node.presenterName.includes(presenterName)
    )
      events.push(formatEvent(event.node));
    if (events.length === 10) {
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

const descriptionToPlainText = (description) => {
  let plainText = "";
  description.children.forEach((paragraph) => {
    paragraph.children.forEach((textNode) => {
      plainText += `<p>${textNode.text}</p>`;
    });
  });
  return plainText;
};
