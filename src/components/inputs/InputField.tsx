import React from "react";
import { useField } from "formik";
import { FormInputProps } from "../../shared/types/EventFormTypes";
import "./InputField.scss";

export const InputField = ({
  name,
  label,
  ...props
}: FormInputProps): JSX.Element => {
  const [field, meta] = useField(name);

  let errorColor;
  let errorBorder;
  if (meta.error && meta.touched) {
    errorColor = { color: "#ed1931" };
    errorBorder = { borderColor: "#ed1931", outline: "none" };
  }

  return (
    <div className="InputField">
      <label htmlFor={name} style={errorColor}>
        {label}
      </label>
      <br />
      <input {...field} {...props} style={errorBorder} />
      {meta.error && meta.touched ? (
        <strong className="error">{meta.error}</strong>
      ) : null}
    </div>
  );
};
