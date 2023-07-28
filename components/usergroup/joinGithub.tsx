import Image from "next/image";
import Link from "next/link";
import { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";

export const JoinGithub = ({ data }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-3 rounded-xl bg-gray-900 bg-arcBackground bg-bottom bg-no-repeat px-11 py-5 text-center font-helvetica">
      <Image
        src={"/images/badges/Github-Badge.svg"}
        alt="github image"
        width={80}
        height={80}
        className="mx-auto"
      />
      <div
        className="text-center text-md text-white"
        data-tina-field={tinaField(data, "title")}
      >
        {data?.title}
      </div>
      <Link
        href={data?.link ?? "/"}
        target="_blank"
        data-tina-field={tinaField(data, "link")}
        className="unstyled h-12 w-max rounded-md bg-sswRed px-4 py-2 text-md text-white"
      >
        Join the crowd
      </Link>
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
