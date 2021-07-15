import React from "react";
import { Formik, Form } from "formik";
import { DateInputField } from "../inputs/DateInputField";
import { InputField } from "./../inputs/InputField";
import { eventFormValidation } from "./../../utils/validation/eventFormValidation";
import type { FormValues } from "../../shared/types/EventFormTypes";
import { parseDate } from "./../../utils/functions/parseDate";
import "./AddEventForm.scss";

const initialValues: FormValues = {
  eventName: "",
  eventDate: parseDate(new Date()),
  eventStart: "",
  eventEnd: "",
};

export const AddEventForm = () => {
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
      <Form className="EventForm">
        <h1 className="FormTitle">Добавить мероприятие</h1>

        <div className="FormInputs">
          <InputField
            name="eventName"
            label="Название"
            type="text"
            autoComplete="off"
          />
          <DateInputField name="eventDate" label="Дата" />
          <InputField name="eventStart" label="Время начала" type="time" />
          <InputField name="eventEnd" label="Время конца" type="time" />
        </div>

        <button className="SubmitButton" type="submit">
          ДОБАВИТЬ
        </button>
      </Form>
    </Formik>
  );
};
