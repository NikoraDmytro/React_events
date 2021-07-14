import { FormInputProps } from "../../shared/types/EventFormTypes";
import { InputField } from "./InputField";
import { parseDate } from "./../../utils/functions/parseDate";

export const DateInputField = ({
  name,
  label,
  ...props
}: FormInputProps): JSX.Element => {
  const now = new Date();
  const minDate = parseDate(now);
  const fiveYearsLater = new Date(now.setFullYear(now.getFullYear() + 5));
  const maxDate = parseDate(fiveYearsLater);

  return (
    <InputField
      name={name}
      label={label}
      type="date"
      min={minDate}
      max={maxDate}
      {...props}
    />
  );
};
