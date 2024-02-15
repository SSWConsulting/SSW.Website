import classNames from "classnames";
import Image from "next/image";
import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import { CustomLink } from "../customLink";

export type JoinGithubProps = {
  data?: {
    title?: string;
    link?: string;
  };
  className?: string;
};

export const JoinGithub = ({ data, className }: JoinGithubProps) => {
  return (
    <div
      className={classNames(
        "flex flex-col items-center justify-center gap-y-3 rounded-xl bg-ssw-black bg-arcBackground bg-bottom bg-no-repeat px-11 py-5 text-center",
        className
      )}
    >
      <Image
        src={"/images/badges/Github-Badge.svg"}
        alt="github image"
        width={60}
        height={60}
        className="mx-auto"
      />
      <div
        className="text-center text-base text-white"
        data-tina-field={tinaField(data, "title")}
      >
        {data?.title}
      </div>
      <CustomLink
        href={data?.link ?? "/"}
        data-tina-field={tinaField(data, "link")}
        className="unstyled flex h-10 w-max items-center rounded-md bg-sswRed px-4 py-2 text-base text-white"
      >
        Join the crowd
      </CustomLink>
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
