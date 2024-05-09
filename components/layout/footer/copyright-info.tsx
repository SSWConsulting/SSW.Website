import { CustomLink } from "@/components/customLink";
import { Divider } from "./divider";

export const CopyrightInfo = () => {
  const chooseIssueURL = `https://github.com/${process.env.NEXT_PUBLIC_GITHUB_REPOSITORY}/issues/new/choose`;
  return (
    <>
      <div>
        &copy; 1990-{new Date().getFullYear()} SSW. All rights reserved.
      </div>
      <div className="text-center">
        <CustomLink href={chooseIssueURL}>FEEDBACK TO SSW</CustomLink>
        <Divider />
        <CustomLink href="/terms-and-conditions">
          TERMS AND CONDITIONS
        </CustomLink>
        <Divider />
        <CustomLink href="/privacy">PRIVACY</CustomLink>
      </div>
    </>
  );
};
