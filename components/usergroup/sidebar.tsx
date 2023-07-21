import { Template } from "tinacms";
import { Section } from "../util/section";
import { JoinAsPresenter } from "./joinAsPresenter";
import { JoinGithub } from "./joinGithub";
import { Organizer } from "./organizer";

const UserGroupSidebar = ({ data }: { data?: Record<string, string> }) => {
  return (
    <Section className="flex w-96 flex-col gap-25 font-helvetica">
      <JoinGithub />
      <Organizer />
      <JoinAsPresenter />
    </Section>
  );
};

export const userGroupSidebarSchema: Template = {
  label: "UserGroup Sidebar",
  name: "userGroupSidebar",
  fields: [
    {
      type: "string",
      label: "name",
      name: "name",
    },
  ],
};

export default UserGroupSidebar;
