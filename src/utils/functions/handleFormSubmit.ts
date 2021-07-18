import { FormikHelpers } from "formik";
import { FormValues } from "../../shared/types/EventFormTypes";
import { EventsStore } from "./../../stores/EventsStore";

export const handleFormSubmit = async (
  values: FormValues,
  { setSubmitting, setErrors, resetForm }: FormikHelpers<FormValues>
) => {
  try {
    await EventsStore.addNewEvent(values);
    resetForm();
    setSubmitting(false);
  } catch (err) {
    const status = err.request?.status || undefined;
    const response = err.request?.response || undefined;

    if (status === 403 && response === "Time is busy!") {
      setErrors({ eventStart: "Время занято!", eventEnd: "Время занято!" });
      return;
    }

    console.log(err);
  }
};
