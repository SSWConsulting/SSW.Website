import Image from "next/image";
import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { presenterSchemaConstants } from "../../.tina/collections/presenter";
import { Container } from "../util/container";

export const PresenterBlock = ({ data }) => {
  return (
    <Container size="custom">
      <h2
        className="mb-12 text-center"
        data-tina-field={tinaField(data, presenterBlockConstant.header)}
      >
        About our <span className="text-sswRed">{data.header}</span>
      </h2>
      <div className="flex flex-row flex-wrap justify-center gap-4 md:gap-4">
        {data.presenterList?.map((p, i) => (
          <PresenterCard
            key={i}
            presenter={p.presenter}
            schema={data.presenterList}
            index={i}
          />
        ))}
      </div>
      {data.otherEvent && (
        <div className="grid grid-cols-12 px-4 py-12 text-center text-xl">
          <div className="col-span-12 justify-center md:inline-flex">
            <span className="self-center">You can also check our</span>
            <span
              className="prose flex justify-center gap-2 self-center"
              data-tina-field={tinaField(
                data.otherEvent,
                presenterBlockConstant.otherEvent.title
              )}
            >
              <a
                href={data.otherEvent.eventURL}
                className="inline-flex cursor-pointer text-xl font-normal"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="p-2">{data.otherEvent.title}</span>
              </a>
            </span>
          </div>
        </div>
      )}
      {!data.otherEvent && <div className="pb-12"></div>}
    </Container>
  );
};

const PresenterCard = ({ presenter, schema, index }) => {
  return (
    <div
      className="prose flex h-fit flex-col rounded-md border-b-4 border-b-sswRed bg-gray-100 p-10 text-center text-xl md:h-172 md:w-96"
      data-aos="flip-right"
    >
      <div
        className="not-prose flex flex-col items-center"
        data-tina-field={tinaField(
          schema[index].presenter,
          presenterSchemaConstants.presenter.peopleProfileURL
        )}
      >
        <span className="h-32 w-32 overflow-hidden rounded-full">
          <Image
            alt={`Picture of ${presenter?.presenter?.name ?? "Presenter"}`}
            src={presenter?.profileImg ?? ""}
            height={120}
            width={120}
            className="w-32"
          />
        </span>
      </div>
      <a
        href={presenter?.presenter?.peopleProfileURL}
        className="mt-4 min-h-16 font-normal"
        target="_blank"
        rel="noopener noreferrer"
        data-tina-field={tinaField(
          schema[index].presenter?.presenter,
          presenterSchemaConstants.presenter.name
        )}
      >
        {presenter?.presenter?.name}
      </a>
      <div
        className="mt-2 text-sm text-gray-900"
        data-tina-field={tinaField(
          schema[index].presenter?.presenter,
          presenterSchemaConstants.about
        )}
      >
        <TinaMarkdown content={presenter?.about} />
      </div>
    </div>
  );
};

export const presenterBlockConstant = {
  value: "PresenterBlock",
  header: "header",
  presenterList: {
    value: "presenterList",
    presenter: "presenter",
  },
  otherEvent: { value: "otherEvent", title: "title", eventURL: "eventURL" },
};

export const presenterBlockSchema: Template = {
  name: presenterBlockConstant.value,
  label: "Presenters",
  fields: [
    {
      type: "string",
      label: "Header",
      name: presenterBlockConstant.header,
    },
    {
      type: "object",
      name: presenterBlockConstant.presenterList.value,
      label: "Presenters",
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
          name: presenterBlockConstant.presenterList.presenter,
          label: "Presenters",
          collections: ["presenter"],
        },
      ],
    },
    {
      type: "object",
      label: "Other Events",
      name: presenterBlockConstant.otherEvent.value,
      fields: [
        {
          type: "string",
          label: "Title",
          name: presenterBlockConstant.otherEvent.title,
        },
        {
          type: "string",
          label: "URL",
          name: presenterBlockConstant.otherEvent.eventURL,
        },
      ],
    },
  ],
};
