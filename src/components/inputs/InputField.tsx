import { useField } from "formik";
import React from "react";
import { FormInputProps } from "../../shared/types/EventFormTypes";

export const InputField = ({
  name,
  label,
  ...props
}: FormInputProps): JSX.Element => {
  const [field, meta] = useField(name);

  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input {...field} {...props} />
      {meta.error && meta.touched ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};
