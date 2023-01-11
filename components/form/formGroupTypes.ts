import { ChangeEventHandler } from "react";

export type FormGroupProps = {
  label: string;
  activeLabelClass?: string | null;
  fieldClass?: string | null;
  errorMessageClass?: string | null;
  
  handleChange: ChangeEventHandler<HTMLInputElement>;
};
