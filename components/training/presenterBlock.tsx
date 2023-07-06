import Image from "next/image";
import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Container } from "../util/container";

export const PresenterBlock = ({ data }) => {
  return (
    <Container size="custom">
      <h2
        className="mb-8 text-center"
        data-tina-field={tinaField(data, presenterBlock.header)}
      >
        About our <span className="text-sswRed">{data.header}</span>
      </h2>
      <div className="grid gap-6 md:grid-cols-3">
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
        <div className="grid grid-cols-12 px-4 py-12 text-xl">
          <div className="col-span-12 inline-flex justify-center">
            <span className="self-center">You can also check our</span>
            <span
              className="flex self-center"
              data-tina-field={tinaField(
                data.otherEvent,
                presenterBlock.otherEvent.title
              )}
            >
              <a
                href={data.otherEvent.eventURL}
                className="inline-flex cursor-pointer"
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
  console.log(
    "🚀 ~ file: presenterBlock.tsx:56 ~ PresenterCard ~ schema:",
    schema
  );
  return (
    <div
      className="flex h-fit flex-col rounded-md border-b-4 border-b-sswRed bg-gray-100 p-10 text-center text-xl shadow drop-shadow md:h-full"
      data-aos="flip-right"
    >
      <div
        className="flex flex-col items-center"
        data-tina-field={tinaField(schema[index].presenter, "profileImg")}
      >
        <Image
          alt={`Picture of ${presenter?.presenter?.name ?? "Presenter"}`}
          src={presenter?.profileImg ?? ""}
          height={120}
          width={120}
          className="rounded-full"
        />
      </div>
      <a
        href={presenter?.presenter?.peopleProfileURL}
        className="mt-4 min-h-16 !no-underline"
        target="_blank"
        rel="noopener noreferrer"
        data-tina-field={tinaField(schema[index].presenter.presenter, "name")}
      >
        {presenter?.presenter?.name}
      </a>
      <div
        className="mt-2 text-sm text-gray-900"
        data-tina-field={tinaField(schema[index].presenter.presenter, "about")}
      >
        <TinaMarkdown content={presenter?.about} />
      </div>
    </div>
  );
};

export const presenterBlock = {
  value: "PresenterBlock",
  header: "header",
  presenterList: {
    value: "presenterList",
    presenter: "presenter",
  },
  otherEvent: { value: "otherEvent", title: "title", eventURL: "eventURL" },
};

export const presenterBlockSchema: Template = {
  name: presenterBlock.value,
  label: "Presenters",
  fields: [
    {
      type: "string",
      label: "Header",
      name: presenterBlock.header,
    },
    {
      type: "object",
      name: presenterBlock.presenterList.value,
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
          name: presenterBlock.presenterList.presenter,
          label: "Presenters",
          collections: ["presenter"],
        },
      ],
    },
    {
      type: "object",
      label: "Other Events",
      name: presenterBlock.otherEvent.value,
      fields: [
        {
          type: "string",
          label: "Title",
          name: presenterBlock.otherEvent.title,
        },
        {
          type: "string",
          label: "URL",
          name: presenterBlock.otherEvent.eventURL,
        },
      ],
    },
  ],
};
