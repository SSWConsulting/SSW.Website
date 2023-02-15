import classNames from "classnames";
import { ErrorMessage, Field, FieldHookConfig, useField } from "formik";
import { ChangeEvent, ChangeEventHandler, VFC } from "react";
import { FormGroupProps } from "./formGroupTypes";
import styles from "./formGroup.module.css";

const FormGroupTextArea: VFC<
  FieldHookConfig<string> &
    FormGroupProps<HTMLTextAreaElement>
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
    <div className={styles["field-wrapper"]}>
      <label htmlFor={props.id || props.name} className={activeLabelClass}>
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
              className={fieldClass}
              onChange={textAreaOnChange}
            />
          );
        }}
      </Field>
      <small>Maximum 2000 characters</small>
      <ErrorMessage
        name={field.name}
        className={errorMessageClass}
        component="div"
      />
    </div>
  );
};

export default FormGroupTextArea;
