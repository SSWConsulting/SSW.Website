import Image from "next/image";
import { Template } from "tinacms";

export const JoinGithub = ({ data }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-3 rounded-xl bg-gray-900 bg-arcBackground bg-right-bottom bg-no-repeat px-11 py-5 text-center font-helvetica">
      <Image
        src={"/images/badges/Github-Badge.svg"}
        alt="github image"
        width={80}
        height={80}
        className="mx-auto"
      />
      <div className="text-center text-md text-white">{data?.title}</div>
      <button
        onClick={() => window.open(data?.link ?? "", "_blank").focus}
        className="h-12 w-max rounded-md bg-sswRed px-4 py-2 text-md leading-3 text-white"
      >
        Join the crowd
      </button>
    </div>
  );
};

export const joinGithubSchema: Template = {
  label: "Join Github",
  name: "joinGithub",
  fields: [
    {
      label: "Title",
      name: "title",
      type: "string",
    },
    {
      label: "Join Github Link",
      name: "link",
      type: "string",
    },
  ],
};
