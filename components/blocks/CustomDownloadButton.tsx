import { FaFileDownload } from "@react-icons/all-files/fa/FaFileDownload";
import { Template } from "tinacms";
import Button from "../button/button";
import { CustomLink } from "../customLink";

export const CustomDownloadButton = ({ data }) => {
  const { btnText, btnLink } = data;
  return (
    <div className="mt-4 flex justify-start border-1 border-gray-300 bg-gray-125 px-6 py-4">
      <CustomLink target={"_blank"} href={btnLink}>
        <Button ripple className="done mx-2 inline-flex !h-10 pl-3">
          <FaFileDownload className="m-icon" />
          {btnText}
        </Button>
      </CustomLink>
    </div>
  );
};

export const customDownloadButtonSchema: Template = {
  name: "CustomDownloadButton",
  label: "Custom Download Button",
  fields: [
    {
      type: "string",
      label: "Text",
      name: "btnText",
    },
    {
      type: "string",
      label: "Link",
      name: "btnLink",
    },
  ],
};
