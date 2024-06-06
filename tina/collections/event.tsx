import { Collection } from "tinacms";

const datetimeFormat = {
  timeFormat: "hh:mm a",
  dateFormat: "ddd DD MMMM YYYY,",
};

export const eventSchema: Collection = {
  label: "Events - Calendar",
  name: "calendarEvents",
  path: "content/event",
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
    },
    {
      type: "string",
      label: "URL",
      name: "url",
      required: true,
    },
    {
      type: "object",
      label: "Thumbnail",
      name: "thumbnail",
      required: true,
      fields: [
        {
          type: "image",
          label: "URL",
          name: "url",
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore - upload dir not included in Tina type but works anyway
          uploadDir: () => "verticalImageLayout",
          required: true,
        },
        {
          type: "string",
          label: "Description",
          name: "description",
          description: "Used as alt text for the thumbnail",
        },
      ],
    },
    {
      type: "string",
      label: "Presenter",
      name: "presenter",
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
      type: "object",
      label: "Live Stream",
      name: "liveStream",
      description: "Only input these values when the event has live stream",
      fields: [
        {
          type: "string",
          label: "URL",
          name: "url",
        },
        {
          type: "string",
          label: "Description",
          name: "description",
        },
      ],
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
        "FireBootCamp",
        "SolidQ Courses",
        "SSW Courses",
        "User Groups",
        "Hack Days",
        "UTS Courses",
        "Webinars",
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
      type: "boolean",
      label: "Enabled",
      name: "enabled",
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
    },
    {
      type: "string",
      label: "Description",
      name: "description",
      ui: {
        component: "textarea",
      },
    },
    {
      type: "object",
      name: "presenters",
      label: "Presenters",
      list: true,
      ui: {
        itemProps: (item) => {
          const presenter = item?.presenters;
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
          name: "presenters",
          label: "Presenters",
          collections: ["presenter"],
        },
      ],
    },
    {
      type: "string",
      label: "Internal Note",
      name: "internalNote",
    },
    {
      type: "string",
      label: "YouTube ID",
      name: "youTubeId",
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
    },
    {
      type: "object",
      label: "Trailer",
      name: "trailer",
      fields: [
        {
          type: "string",
          label: "URL",
          name: "url",
        },
        {
          type: "string",
          label: "Description",
          name: "description",
        },
      ],
    },
    {
      type: "boolean",
      label: "Hosted at SSW",
      name: "hostedAtSsw",
      description:
        "Indicates that the event is being hosted at the SSW office at the chosen city",
    },
  ],
};
