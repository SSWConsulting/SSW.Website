import { ChangeEvent } from "react";

export type FormGroupProps<T = Element> = {
  label: string;
  activeLabelClass?: string | null;
  fieldClass?: string | null;
  errorMessageClass?: string | null;
  handleChange?: (field: { name: string }, e: ChangeEvent<T>) => void;
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
};
