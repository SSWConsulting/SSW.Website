import { Template } from "tinacms";

const Avatar = ({ img }: { img?: string }) => {
  return (
    <div className="w-56">
      <svg viewBox="0 0 220 250" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill="#E9E9E9" d="M220,250 v-105 A110,105 0 1,0 110,250 Z" />
        <defs>
          <clipPath id="shape">
            <path d="M220,250 V0 H0 V145 A110,105 0 0,0 110,250 Z" />
          </clipPath>
        </defs>
        {img ? (
          <image href={img} width={220} clipPath="url(#shape)"></image>
        ) : null}
      </svg>
    </div>
  );
};

export const JoinAsPresenter = ({
  img,
  link,
}: {
  img?: string;
  link?: string;
}) => {
  return (
    <div className="flex flex-row items-center gap-3 font-helvetica">
      <div>
        <Avatar img={img} />
      </div>
      <div className="text-center">
        <div className="text-xl leading-7">Join us as a Presenter</div>
        <button
          className="mt-6 h-10 rounded-md bg-sswRed px-4 py-2 text-md leading-3 text-white"
          onClick={() => window.open(link, "_blank").focus}
        >
          Learn more
        </button>
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
