import classNames from "classnames";
import Image from "next/image";
import { type Template } from "tinacms";
import { CustomLink } from "../customLink";

export const ExpertBlock = (props) => {
  const { header, expertList, link } = props;
  return (
    <>
      <div className=" bg-slate-100 py-0.5 text-sswBlack">
        {header.toUpperCase()}
      </div>
      <div className="my-2 grid grid-cols-12">
        {expertList?.map((expert, index) => {
          return (
            <Expert data={expert} noOfExperts={expertList.length} key={index} />
          );
        })}
      </div>
      <hr />
      <div className=" mt-4 font-normal">
        <CustomLink href={link.url}>{link.text}</CustomLink>
      </div>
    </>
  );
};

const Expert = ({ data, noOfExperts }) => {
  const { person, profileImage, peopleURL, skills } = data;

  return (
    <div
      className={classNames(
        "flex py-2 col-span-12 md:col-span-6",
        noOfExperts > 2 ? "lg:col-span-4" : "lg:col-span-6"
      )}
    >
      {" "}
      <div>
        <Image
          src={profileImage}
          alt={"Profile Image"}
          height={75}
          width={75}
          className="rounded-sm"
        />
      </div>
      <div className="ml-2 flex h-full flex-col justify-between">
        <CustomLink className="text-left" href={peopleURL ?? ""}>
          <span className="font-bold">{person}</span>
        </CustomLink>
        <div className="font-normal">{skills}</div>
      </div>
    </div>
  );
};

export const expertBlockSchema: Template = {
  name: "ExpertBlock",
  label: "Expert Block",
  fields: [
    {
      type: "string",
      label: "Header",
      name: "header",
      required: true,
    },
    {
      type: "object",
      label: "Expert List",
      name: "expertList",
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: item?.person,
          };
        },
      },
      fields: [
        {
          type: "string",
          label: "Person",
          name: "person",
        },
        {
          type: "image",
          label: "Profile Image",
          name: "profileImage",
          // @ts-expect-error tinacms types are wrong
          uploadDir: () => "people",
        },
        {
          type: "string",
          label: "People URL",
          name: "peopleURL",
        },
        {
          type: "string",
          label: "Skills",
          name: "skills",
        },
      ],
    },
    {
      type: "object",
      label: "Link",
      name: "link",
      fields: [
        {
          type: "string",
          label: "Text",
          name: "text",
        },
        {
          type: "string",
          label: "URL",
          name: "url",
        },
      ],
    },
  ],
};
