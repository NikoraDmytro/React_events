import React from "react";
import { Formik, Form } from "formik";
import { FormValues } from "./shared/types/EventFormTypes";
import { parseDate } from "./utils/functions/parseDate";
import { eventFormValidation } from "./utils/validation/eventFormValidation";
import { InputField } from "./components/inputs/InputField";
import { DateInputField } from "./components/inputs/DateInputField";

const initialValues: FormValues = {
  eventName: "",
  eventDate: parseDate(new Date()),
  eventStart: "",
  eventEnd: "",
};

export default function App(): JSX.Element {
  return (
    <Formik
      initialValues={initialValues}
      validate={eventFormValidation}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        alert(values);
        resetForm();
        setSubmitting(false);
      }}
    >
      <Form>
        <InputField name="eventName" label="Название" type="text" />
        <DateInputField name="eventDate" label="Дата" />
        <InputField name="eventStart" label="Время начала" type="time" />
        <InputField name="eventEnd" label="Время конца" type="time" />
        <button type="submit">Добавить</button>
      </Form>
    </Formik>
  );
}
