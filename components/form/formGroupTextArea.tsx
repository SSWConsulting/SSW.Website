import classNames from "classnames";
import { ErrorMessage, Field, FieldHookConfig, useField } from "formik";
import { ChangeEvent, ChangeEventHandler, VFC } from "react";
import { FormGroupProps } from "./formGroupTypes";

const FormGroupTextArea: VFC<
  FieldHookConfig<any> &
    FormGroupProps & { handleChange: ChangeEventHandler<HTMLTextAreaElement> }
> = ({
  label,
  activeLabelClass,
  fieldClass,
  errorMessageClass,
  handleChange,
  ...props
}) => {
  const [field, meta] = useField(props);

  fieldClass = classNames(fieldClass || "form-control", {
    "is-invalid": !!meta.error,
  });
  !errorMessageClass && (errorMessageClass = "invalid-feedback");
  !props.placeholder && (props.placeholder = label);

  return (
    <div className="field-wrapper">
      <label htmlFor={props.id || props.name} className={activeLabelClass}>
        {label}
      </label>
      <Field name={field.name}>
        {({ field }) => {
          const textAreaOnChange: ChangeEventHandler<HTMLTextAreaElement> = (
            e: ChangeEvent<HTMLTextAreaElement>
          ) => {
            field.onChange(e);
            handleChange(e);
          };

          return (
            <textarea
              {...field}
              {...props}
              className={fieldClass}
              onChange={textAreaOnChange}
            />
          );
        }}
      </Field>
      <small>Maximium 2000 characters</small>
      <ErrorMessage
        name={field.name}
        className={errorMessageClass}
        component="div"
      />
    </div>
  );
};

export default FormGroupTextArea;
