import { FormikHelpers } from "formik";
import { FormValues } from "../../shared/types/EventFormTypes";
import { EventData } from "../../shared/types/EventsStoreTypes";
import { EventsStore } from "./../../stores/EventsStore";

export const handleEventEdit = async (
  values: FormValues,
  { setSubmitting, setErrors }: FormikHelpers<FormValues>,
  event: EventData,
  toggleMode: () => void
) => {
  try {
    await EventsStore.editEvent(values, event);
    setSubmitting(false);
    toggleMode();
  } catch (err) {
    const status = err.request?.status || undefined;
    const response = err.request?.response || undefined;

    if (status === 403 && response === "Time is busy!") {
      setErrors({ eventStart: "Время занято!" });
      return;
    }

    console.log(err);
  }
};
