import { useFormikContext } from "formik";
import { FormInputProps } from "../../shared/types/EventFormTypes";
import { InputField } from "./InputField";

export const EventStartInputField = ({ ...props }: FormInputProps) => {
  const { setFieldValue, setFieldTouched } = useFormikContext();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue("eventStart", event.target.value);
    setFieldValue("eventEnd", "");
    setFieldTouched("eventEnd", false);
  };

  return <InputField onChange={handleChange} type="time" {...props} />;
};
