import classNames from "classnames";
import { ErrorMessage, Field, FieldHookConfig, useField } from "formik";
import { ChangeEvent, ChangeEventHandler, FC } from "react";
import { FormGroupProps } from "./formGroupTypes";
import styles from "./formGroup.module.css";

const FormGroupInput: FC<
  FieldHookConfig<string> &
    FormGroupProps<HTMLInputElement>
> = ({
  label,
  activeLabelClass,
  fieldClass,
  errorMessageClass,
  handleChange,
  ...props
}) => {
  const [field, meta] = useField(props);

  fieldClass = classNames(fieldClass || styles["form-control"],
    !!meta.error && styles["is-invalid"],
  );
  !errorMessageClass && (errorMessageClass = styles["invalid-feedback"]);
  !props.placeholder && (props.placeholder = label);

  return (
    <div className={classNames(styles["field-wrapper"], "relative mb-5 block py-1.5")}>
      <label htmlFor={field.name} className={styles[activeLabelClass]}>
        {label}
      </label>
      <Field name={field.name}>
        {({ field }) => {
          const inputOnChange: ChangeEventHandler<HTMLInputElement> = (
            e: ChangeEvent<HTMLInputElement>
          ) => {
            field.onChange(e);
            !!handleChange && handleChange(field, e);
          };

          return (
            <input
              {...field}
              {...props}
              className={fieldClass}
              onChange={inputOnChange}
            />
          );
        }}
      </Field>
      <ErrorMessage
        name={field.name}
        className={errorMessageClass}
        component="div"
      />
    </div>
  );
};

export default FormGroupInput;
