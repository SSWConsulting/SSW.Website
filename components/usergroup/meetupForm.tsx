// TODO - Migrate to ticketForm.tsx https://github.com/SSWConsulting/SSW.Website/issues/1475

import { tinaField } from "tinacms/dist/react";
import { CustomLink } from "../customLink";

type MeetupFormProps = {
  meetupBtnText?: string;
  registerUrl?: string;
};

export const MeetupForm = (props: MeetupFormProps) => {
  const { registerUrl, meetupBtnText } = props;
  return (
    <div className="flex w-full max-w-md flex-col justify-center self-start rounded-md bg-white p-4 max-md:mx-auto">
      <CustomLink
        href={
          registerUrl || "https://www.meetup.com/en-AU/sydney-net-user-group/"
        }
        className="unstyled m-4 mx-auto flex h-10 items-center justify-center rounded-md bg-sswRed px-4 py-3 font-medium text-white hover:bg-sswDarkRed"
        data-tina-field={tinaField(props, "meetupBtnText")}
      >
        {meetupBtnText || "Get your free ticket"}
      </CustomLink>
    </div>
  );
};
