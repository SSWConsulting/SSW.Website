import Image from "next/image";
import { type Template } from "tinacms";
import { CustomLink } from "../customLink";

export type ExpertBlockProps = {
  header: string;
  expertList: {
    person: string;
    profileImage: string;
    peopleURL: string;
    skills: string;
  }[];
  link: {
    text: string;
    url: string;
  };
};

export const ExpertBlock: React.FC<ExpertBlockProps> = ({
  header,
  expertList,
  link,
}) => {
  return (
    <>
      <hr />
      <h2 className="pb-12">{header && header.toUpperCase()}</h2>
      <div className="flex justify-center gap-6 pb-12">
        {expertList?.map((expert, index) => {
          return <Expert data={expert} key={index} />;
        })}
      </div>
      <div className="mt-4 pb-8 font-normal">
        {link && <CustomLink href={link.url}>{link.text}</CustomLink>}
      </div>
      <hr />
    </>
  );
};

const Expert = ({ data }) => {
  const { person, profileImage, peopleURL, skills } = data;

  return (
    <div className="flex w-full grow flex-col rounded-md border-b-4 border-b-sswRed bg-gray-100 p-8 text-center text-xl drop-shadow md:min-h-96 md:max-w-sm md:grow-0 md:p-10 md:basis_gap-96-6">
      <span className="size-32 self-center overflow-hidden rounded-full">
        <Image
          alt={`Picture of ${person}`}
          src={profileImage ?? ""}
          height={120}
          width={120}
          className="w-32"
          quality={90}
        />
      </span>
      <CustomLink href={peopleURL} className="mt-4 min-h-12 text-black">
        {person}
      </CustomLink>
      <div className="mt-2 text-sm text-ssw-black">{skills}</div>
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
