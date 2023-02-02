import classNames from "classnames";
import { ErrorMessage, Field, FieldHookConfig, useField } from "formik";
import {
  ChangeEvent,
  ChangeEventHandler,
  FC
} from "react";
import { FormGroupProps } from "./formGroupTypes";

const FormGroupSelect: FC<
  FieldHookConfig<string> &
    FormGroupProps<HTMLSelectElement>
> = ({
  label,
  activeLabelClass,
  fieldClass,
  errorMessageClass,
  handleChange,
  handleClick,
  ...props
}) => {
  const [field, meta] = useField(props);
  
  fieldClass = classNames(fieldClass || "form-select", {
    "is-invalid": !!meta.error,
  });
  !errorMessageClass && (errorMessageClass = "invalid-feedback");

  return (
    <div className="field-wrapper">
      <label htmlFor={props.id || props.name} className={activeLabelClass}>
        {label}
      </label>
      <Field name={field.name}>
        {({ field }) => {
          const selectOnChange: ChangeEventHandler<HTMLSelectElement> = (
            e: ChangeEvent<HTMLSelectElement>
          ) => {
            field.onChange(e);
            !!handleChange && handleChange(field, e);
          };

          return (
            <select
              {...field}
              {...props}
              className={fieldClass}
              onChange={selectOnChange}
              onClick={handleClick}
            >
              {props.children}
            </select>
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

export default FormGroupSelect;
