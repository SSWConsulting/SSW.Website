import React, { useState } from "react";
import { Collection, TextField } from "tinacms";

const datetimeFormat = {
  timeFormat: "hh:mm a",
  dateFormat: "ddd DD MMMM YYYY,",
};
const removeEmptyObjects = (formValues: object, fieldKey: string) => {
  let field = formValues[fieldKey];
  if (!field) return formValues;
  field = field.filter((item: object) => {
    return Object.keys(item).length > 0;
  });
  if (field.length) {
    return {
      ...formValues,
      [fieldKey]: field,
    };
  }
  delete formValues[fieldKey];
  return formValues;
};
export const eventsCalendarSchema: Collection = {
  label: "Events - Calendar",
  name: "eventsCalendar",
  path: "content/events-calendar",
  format: "json",
  ui: {
    beforeSubmit: async ({ values }) => {
      return removeEmptyObjects(values, "presenterList") as Record<
        string,
        unknown
      >;
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore - upload dir not included in Tina type but works anyway
    defaultItem: () => ({ enabled: true, liveStreamDelayMinutes: 30 }),
  },
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title",
      required: true,
      isTitle: true,
      description: "{{ NAME OF EVENT }} - {{ LOCATION }} (10-15 words max)",
    },
    {
      type: "string",
      label: "URL",
      name: "url",
      required: true,
      description:
        "URL of the event page (e.g. https://www.ssw.com.au/events/angular-workshop)",
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
      type: "object",
      name: "presenterList",
      label: "Presenters",
      description:
        "Shown on the event listing (Presenters: Presenter1, Presenter2 & Presenter3) - Please ensure all presenters in the list are filled out",
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
          ui: {
            optionComponent: (
              props: { presenter: { name?: string }; profileImg: string },
              _internalSys: { path: string }
            ) => {
              const presenter = props.presenter;
              const ProfilePicture = ({
                src,
                alt,
              }: {
                src: string;
                alt: string;
              }) => {
                const [imgLoaded, setImgLoaded] = useState(true);

                return (
                  <>
                    {imgLoaded ? (
                      // next image component is not available in the tina editor
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        onError={() => setImgLoaded(false)}
                        className="size-8 rounded-full object-cover"
                        src={src}
                        alt={alt}
                      />
                    ) : (
                      <div className="size-8 rounded-full bg-gray-400"></div>
                    )}
                  </>
                );
              };
              if (!presenter.name) return _internalSys.path;

              return (
                <p className="flex min-h-8 items-center gap-4">
                  {props.profileImg && (
                    <ProfilePicture
                      src={props.profileImg}
                      alt={`${presenter.name} Profile`}
                    />
                  )}
                  {presenter.name}{" "}
                </p>
              );
            },
            validate: (value) => {
              if (!value) return "Please select a presenter";
            },
          },
          name: "presenter",
          label: "Presenter",
          collections: ["presenter"],
        },
      ],
    },
    {
      type: "string",
      label: "Presenter Name Override",
      name: "presenterName",
      description:
        "Use this for external presenters - Will override the presenter name(s) shown on the event",
    },
    {
      type: "string",
      label: "Presenter Website",
      name: "presenterProfileUrl",
      description:
        "Use this for external presenters - This link will appear the on the presenter's name when the field above is filled out \"",
    },

    {
      type: "datetime",
      label: "Start Date/Time",
      name: "startDateTime",
      description: "Add the time of the event in Sydney time",
      required: true,
      ui: datetimeFormat,
    },
    {
      type: "datetime",
      label: "End Date/Time",
      name: "endDateTime",
      required: true,
      ui: datetimeFormat,
    },
    {
      type: "datetime",
      label: "Website - Show livestream banner start time",
      name: "startShowBannerDateTime",
      description: "Leave empty if the event isn't being livestreamed",
      ui: datetimeFormat,
    },
    {
      type: "datetime",
      label: "Website - Show livestream banner end time",
      name: "endShowBannerDateTime",
      description: "Leave empty if the event isn't being livestreamed",
      ui: datetimeFormat,
    },
    {
      type: "string",
      label: "Event Type",
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
        "Artificial Intelligence",
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
      type: "string",
      label: "YouTube ID",
      name: "youTubeId",
      description:
        "The Youtube ID of the livestream - For SSW TV to fill in on the day of the event",
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
      type: "string",
      label: "Trailer Video - URL",
      name: "trailerUrl",
    },
    {
      type: "boolean",
      label: "Hosted at SSW",
      name: "hostedAtSsw",
    },
    {
      type: "boolean",
      label: "Show on SSW Website",
      name: "enabled",
      description: "Disable for private events",
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
