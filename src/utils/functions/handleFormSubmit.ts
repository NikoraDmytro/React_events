import { FormikHelpers } from "formik";
import { FormValues } from "../../shared/types/EventFormTypes";
import { EventsStore } from "./../../stores/EventsStore";

export const handleFormSubmit = async (
  values: FormValues,
  { setSubmitting, resetForm }: FormikHelpers<FormValues>
) => {
  try {
    await EventsStore.addNewEvent(values);
    resetForm();
    setSubmitting(false);
  } catch (err) {
    const status = err.request.status;
    const response = err.request.response;

    if (status === 403 && response === "Time is busy!") {
      alert("Time is busy");
    } else {
      console.log(err);
    }
  }
};
