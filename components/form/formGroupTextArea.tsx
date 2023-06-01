import classNames from "classnames";
import { ErrorMessage, Field, FieldHookConfig, useField } from "formik";
import { ChangeEvent, ChangeEventHandler } from "react";
import { FormGroupProps } from "./formGroupTypes";
import styles from "./formGroup.module.css";

const FormGroupTextArea = ({
  label,
  activeLabelClass,
  fieldClass,
  errorMessageClass,
  handleChange,
  ...props
}: FieldHookConfig<string> & FormGroupProps<HTMLTextAreaElement>) => {
  const [field, meta] = useField(props);

  !props.placeholder && (props.placeholder = label);

  return (
    <div className={styles["field-wrapper"]}>
      <label htmlFor={props.id || props.name} className={styles[activeLabelClass]}>
        {label}
      </label>
      <Field name={field.name}>
        {({ field }) => {
          const textAreaOnChange: ChangeEventHandler<HTMLTextAreaElement> = (
            e: ChangeEvent<HTMLTextAreaElement>
          ) => {
            field.onChange(e);
            !!handleChange && handleChange(field, e);
          };

          return (
            <textarea
              {...field}
              {...props}
              className={classNames(fieldClass || styles["form-control"],
                !!meta.error && styles["is-invalid"],
              )}
              onChange={textAreaOnChange}
            />
          );
        }}
      </Field>
      <small>Maximum 2000 characters</small>
      <ErrorMessage
        name={field.name}
        className={errorMessageClass || styles["invalid-feedback"]}
        component="div"
      />
    </div>
  );
};

export default FormGroupTextArea;
