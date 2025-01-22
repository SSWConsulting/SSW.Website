import { TinaField } from "tinacms";
import { azureFooterColors } from "../blocks/builtOnAzure";

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
      options: azureFooterColors,
    },
  ],
};

export default azureBannerSchema;
