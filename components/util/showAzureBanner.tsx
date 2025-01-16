import { TinaField } from "tinacms";
import { sectionColors } from "./constants/styles";

const azureBannerSchema: TinaField = {
  type: "object",
  name: "azureBanner",
  label: "Azure/Tina Footer",
  required: false,
  fields: [
    {
      type: "boolean",
      name: "showAzureFooter",
      label: "Show Azure/Tina Footer",
      required: false,
    },
    {
      type: "string",
      name: "azureFooterColor",
      label: "Azure/Tina Footer Background Color",
      required: false,
      options: Object.keys(sectionColors),
    },
  ],
};

export default azureBannerSchema;
