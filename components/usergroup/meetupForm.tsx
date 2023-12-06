// TODO - Migrate to ticketForm.tsx https://github.com/SSWConsulting/SSW.Website/issues/1475

import classNames from "classnames";
import { CustomLink } from "../customLink";

type MeetupFormProps = {
  className?: string;
  meetupUrl?: string;
};

export const MeetupForm = ({ className, meetupUrl }: MeetupFormProps) => {
  return (
    <div
      className={classNames(
        "max-w-md grow rounded-md bg-white p-10 flex flex-col justify-center",
        className
      )}
    >
      <h3 className="text-center text-sswRed">Get your free ticket</h3>
      <CustomLink
        href={
          meetupUrl || "https://www.meetup.com/en-AU/sydney-net-user-group/"
        }
        className="unstyled mx-auto my-4 rounded-md bg-sswRed px-4 py-3 font-medium text-white"
      >
        Register for free
      </CustomLink>
    </div>
  );
};
