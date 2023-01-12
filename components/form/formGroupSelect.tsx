import { ErrorMessage, Field, FieldHookConfig, useField } from "formik";
import {
  ChangeEvent,
  ChangeEventHandler,
  FC,
  MouseEventHandler
} from "react";
import { FormGroupProps } from "./formGroupTypes";
import classNames from "classnames";

const FormGroupSelect: FC<
  FieldHookConfig<any> &
    FormGroupProps & 
    { handleChange?: ChangeEventHandler<HTMLSelectElement> } & 
    { handleClick: MouseEventHandler<HTMLSelectElement> }
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
            !!handleChange && handleChange(e);
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
