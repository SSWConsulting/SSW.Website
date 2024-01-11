// TODO - Migrate to ticketForm.tsx https://github.com/SSWConsulting/SSW.Website/issues/1475

import { tinaField } from "tinacms/dist/react";
import { CustomLink } from "../customLink";

type MeetupFormProps = {
  meetupTitle?: string;
  meetupBtnText?: string;
  registerUrl?: string;
};

export const MeetupForm = (props: MeetupFormProps) => {
  const { registerUrl, meetupBtnText, meetupTitle } = props;
  return (
    <div className="flex max-w-md grow flex-col justify-center self-start rounded-md bg-white p-10 max-md:mx-auto ">
      <h3
        className="text-center text-sswRed"
        data-tina-field={tinaField(props, "meetupTitle")}
      >
        {meetupTitle || "Get your free ticket"}
      </h3>
      <CustomLink
        href={
          registerUrl || "https://www.meetup.com/en-AU/sydney-net-user-group/"
        }
        className="unstyled mx-auto my-4 rounded-md bg-sswRed px-4 py-3 font-medium text-white"
        data-tina-field={tinaField(props, "meetupBtnText")}
      >
        {meetupBtnText || "Register for free"}
      </CustomLink>
    </div>
  );
};
