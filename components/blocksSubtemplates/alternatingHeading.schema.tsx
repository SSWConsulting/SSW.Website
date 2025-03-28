import { TinaField } from "tinacms";

const alternatingHeadingSchema: TinaField = {
  type: "string",
  label: "Heading",
  name: "heading",
  description: "use double asterisks (**text**) to add red text",
};
export default alternatingHeadingSchema;
