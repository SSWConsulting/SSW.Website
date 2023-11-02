import Image from "next/image";
import Link from "next/link";
import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";

const Avatar = ({ img }) => {
  return (
    <div className="relative h-62 w-56">
      <svg
        viewBox="0 0 224 248"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <path fill="#E9E9E9" d="M224,248 v-106 A112,106 0 1,0 112,248 Z" />
        <defs>
          <clipPath id="shape">
            <path d="M224,248 V0 H0 V142 A112,106 0 0,0 112,248 Z" />
          </clipPath>
        </defs>
      </svg>

      {img && (
        <Image
          alt="Picture of Presenter"
          src={img}
          className="object-contain"
          fill={true}
          style={{
            clipPath: "url(#shape)",
          }}
        />
      )}
    </div>
  );
};

type JoinAsPresenterProps = {
  data: {
    img?: string;
    link?: string;
  };
};

export const JoinAsPresenter = ({ data }: JoinAsPresenterProps) => {
  return (
    <div className="flex-row items-center gap-3 lg:flex">
      <div
        data-tina-field={tinaField(data, "img")}
        className="child:max-lg:mx-auto"
      >
        <Avatar img={data?.img} />
      </div>
      <div className="text-center max-lg:pt-4">
        <div className="text-xl leading-7">Join us as a Presenter</div>
        <Link
          href={data?.link ?? "/"}
          target="_blank"
          data-tina-field={tinaField(data, "link")}
          className="unstyled mx-auto mt-6 block h-10 w-max rounded-md bg-sswRed px-4 py-2 text-md leading-6 text-white"
        >
          Learn more
        </Link>
      </div>
    </div>
  );
};

export const joinAsPresenterSchema: Template = {
  label: "Join As Presenter",
  name: "joinAsPresenter",
  fields: [
    {
      label: "Learn More Link",
      name: "link",
      type: "string",
    },
    {
      label: "Image",
      name: "img",
      type: "image",
    },
  ],
};
