import classNames from "classnames";
import {
  ErrorMessage,
  Field,
  FieldHookConfig,
  useField
} from "formik";
import { ChangeEvent, ChangeEventHandler, VFC } from "react";
import { FormGroupProps } from "./formGroupTypes";

const FormGroupInput: VFC<FieldHookConfig<any> & FormGroupProps> = ({
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
          const inputOnChange: ChangeEventHandler<HTMLInputElement> = (
            e: ChangeEvent<HTMLInputElement>
          ) => {
            field.onChange(e);
            handleChange(e);
          };
          
          return (
            <input
              type="text"
              {...field}
              {...props}
              className={fieldClass}
              onChange={inputOnChange}
            />
          );
        }}
      </Field>
      <ErrorMessage
        name={props.name}
        className={errorMessageClass}
        component="div"
      />
    </div>
  );
};

export default FormGroupInput;
