import classnames from "classnames";
import { FaPrint } from "react-icons/fa";
import type { Template } from "tinacms";
import { sectionColors } from "../util/constants/styles";

export const AgreementForm = ({ data }) => {
  const sectionColorCss =
    sectionColors[data.backgroundColor] || sectionColors.default;
  return (
    <>
      <div className={classnames("pagebreak my-10 p-4 md:p-8", sectionColorCss)}>
        {data.fields.map((field) => (
          <FormField
            key={field.id}
            id={field.id}
            label={field.label}
            placeholder={field.placeholder}
            resizeable={field.resizeable}
          />
        ))}
      </div>

      <hr />
      <div className="flex justify-center">
        <button
          className="done mx-auto my-4 flex px-3 py-2"
          onClick={() => window.print()}
          type="submit"
        >
          <FaPrint className="m-icon" />
          Print and sign
        </button>
      </div>
    </>
  );
};

const FormField = ({ label, id, placeholder, resizeable }) => {
  const classes = "w-full rounded border-2 border-gray-300 p-2";

  return (
    <div className="relative inline-block w-full pb-4 md:flex">
      <div className="py-2 sm:w-48 md:w-64 pr-2 text-left font-bold sm:grow-0 md:text-right">
        <label className="mb-1" htmlFor={id}>
          {label}
        </label>
      </div>
      <div className="inline-flex w-full md:grow">
        {resizeable ? (
          <textarea className={classnames(classes, "resize-y")}></textarea>
        ) : (
          <input
            className={classes}
            type="text"
            id={id}
            name={id}
            placeholder={placeholder}
          />
        )}
      </div>
    </div>
  );
};

export const agreementFormBlockSchema: Template = {
  label: "Agreement Form",
  name: "AgreementForm",
  ui: {
    previewSrc: "/images/thumbs/tina/agreement-form.jpg",
  },
  fields: [
    {
      type: "string",
      label: "Background Color",
      name: "backgroundColor",
      options: [
        { label: "Default", value: "default" },
        { label: "Light Gray", value: "lightgray" },
        { label: "Red", value: "red" },
        { label: "Black", value: "black" },
      ],
    },
    {
      type: "object",
      label: "Form fields",
      name: "fields",
      list: true,
      fields: [
        {
          type: "string",
          label: "ID",
          name: "id",
          required: true,
        },
        {
          type: "string",
          label: "Label",
          name: "label",
          required: true,
        },
        {
          type: "string",
          label: "Placeholder",
          name: "placeholder",
        },
        {
          type: "boolean",
          label: "Resizeable",
          name: "resizeable",
          required: true,
        },
      ],
    },
  ],
};
