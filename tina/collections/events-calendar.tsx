import { useEffect } from "react";
import { Collection, NumberField, TextField } from "tinacms";

const datetimeFormat = {
  timeFormat: "hh:mm a",
  dateFormat: "ddd DD MMMM YYYY,",
};

const LiveStreamDelayMinutes = (props) => {
  const { liveStreamEvent, calendarType, delayedLiveStreamStart } =
    props.tinaForm.values;
  useEffect(() => {
    const { calendarType, liveStreamEvent } = props.tinaForm.values;
    if (calendarType === "User Groups" && liveStreamEvent)
      props.tinaForm.change("liveStreamDelayMinutes", 30);
  }, [liveStreamEvent, calendarType, delayedLiveStreamStart]);
  return NumberField(props);
};

export const eventsCalendarSchema: Collection = {
  label: "Events - Calendar",
  name: "eventsCalendar",
  path: "content/events-calendar",
  format: "json",
  ui: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore - upload dir not included in Tina type but works anyway
    defaultItem: () => ({ enabled: true }),
  },
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title",
      required: true,
      isTitle: true,
      description: "10-15 words max",
    },
    {
      type: "string",
      label: "URL",
      name: "url",
      required: true,
    },
    {
      type: "image",
      label: "Thumbnail",
      name: "thumbnail",
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore - // upload dir not included in Tina type but works anyway
      uploadDir: () => "events",
      required: true,
    },
    {
      type: "string",
      label: "Thumbnail Description",
      name: "thumbnailDescription",
      description: "Used as alt text for the thumbnail",
    },
    {
      type: "string",
      label: "Presenter Name",
      name: "presenterName",
    },
    {
      type: "string",
      label: "Presenter profile URL",
      name: "presenterProfileUrl",
    },
    {
      type: "datetime",
      label: "Start Date Time",
      name: "startDateTime",
      description: "Add the time of the event as it is in Sydney",
      required: true,
      ui: datetimeFormat,
    },
    {
      type: "datetime",
      label: "End Date Time",
      name: "endDateTime",
      required: true,
      ui: datetimeFormat,
    },
    {
      type: "datetime",
      label: "Start Show Banner Date Time",
      name: "startShowBannerDateTime",
      description: "Only input this value when the event has live stream",
      ui: datetimeFormat,
    },
    {
      type: "datetime",
      label: "End Show Banner Date Time",
      name: "endShowBannerDateTime",
      description: "Only input this value when the event has live stream",
      ui: datetimeFormat,
    },
    {
      type: "string",
      label: "Calendar Type",
      name: "calendarType",
      ui: {
        component: "select",
      },
      options: [
        "Conferences",
        "SSW Courses",
        "User Groups",
        "Hack Days",
        "Other",
      ],
    },
    {
      type: "string",
      label: "City",
      name: "city",
      ui: {
        component: "select",
      },
      options: [
        "Sydney",
        "Melbourne",
        "Canberra",
        "Brisbane",
        "Adelaide",
        "Gold Coast",
        "Newcastle",
        "Perth",
        "Auckland",
        "Beijing",
        "Other",
      ],
    },
    {
      type: "string",
      label: "City - Other",
      description: "Enter the name of the city",
      name: "cityOther",
      ui: {
        component: (props) => {
          return props.tinaForm.values.city === "Other"
            ? TextField(props)
            : null;
        },
      },
    },
    {
      type: "string",
      label: "Category",
      name: "category",
      ui: {
        component: "select",
      },
      options: [
        "Angular and React",
        ".NET Core",
        "BI and Reporting Services",
        "Dynamics 365",
        "Data and LINQ",
        "Mobile",
        "Non-English Courses",
        "Office",
        "Scrum",
        "SharePoint",
        "SQL Server",
        "Visual Studio and TFS",
        "Web Design",
        "Azure",
        "DevOps",
        "Other",
      ],
    },
    {
      type: "string",
      label: "Abstract",
      name: "abstract",
      ui: {
        component: "textarea",
      },
      description:
        "Only necessary for User Groups - shown on the landing page for user groups e.g. https://www.ssw.com.au/netug/sydney Ensure this is concise enough to fit on the above page, and does not double up on any information that already exists on the page",
    },
    {
      type: "rich-text",
      label: "Description",
      name: "description",
      description: "This shows on ssw.com.au/events",
    },
    {
      type: "object",
      name: "presenterList",
      label: "Presenter List",
      list: true,
      ui: {
        itemProps: (item) => {
          const presenter = item?.presenter;
          if (!presenter) return { label: "Please Attach Presenter" };

          const formattedLabel = presenter
            .split("/")[2]
            .replace(".mdx", "")
            .replace(/-/g, " ")
            .toUpperCase();

          return {
            label: formattedLabel,
          };
        },
      },
      fields: [
        {
          type: "reference",
          name: "presenter",
          label: "Presenter",
          collections: ["presenter"],
        },
      ],
    },
    {
      type: "string",
      label: "YouTube ID",
      name: "youTubeId",
    },
    {
      type: "boolean",
      label: "Live StreamEvent",
      name: "liveStreamEvent",
    },
    {
      type: "boolean",
      label: "Delayed LiveStream Start",
      name: "delayedLiveStreamStart",
    },
    {
      type: "number",
      label: "Live Stream Delay (Minutes)",
      name: "liveStreamDelayMinutes",
      ui: {
        component: LiveStreamDelayMinutes,
      },
    },
    {
      type: "string",
      label: "Trailer",
      name: "trailerUrl",
    },
    {
      type: "boolean",
      label: "Hosted at SSW",
      name: "hostedAtSsw",
      description:
        "Indicates that the event is being hosted at the SSW office at the chosen city",
    },
    {
      type: "boolean",
      label: "Enabled",
      name: "enabled",
      description: "Show this event on ssw.com.au",
    },
    {
      type: "string",
      label: "Internal Note",
      name: "internalNote",
      description: "For internal use only - This does not render anywhere",
      ui: {
        component: "textarea",
      },
    },
  ],
};
