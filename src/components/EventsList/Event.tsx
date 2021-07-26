import { EventData } from "../../shared/types/EventsStoreTypes";
import editEventImg from "./img/editEvent.png";
import deleteEventImg from "./img/deleteEvent.png";
import confirmChanges from "./img/confirmChanges.png";
import { useState } from "react";
import { DateInputField } from "./../inputs/DateInputField";
import { EventStartInputField } from "./../inputs/EventStartInputField";
import { InputField } from "./../inputs/InputField";
import { Form, Formik, FormikHelpers } from "formik";
import { eventFormValidation } from "./../../utils/validation/eventFormValidation";
import { EventsStore } from "./../../stores/EventsStore";
import { handleEventEdit } from "./../../utils/functions/handleEventEdit";

interface Props {
  event: EventData;
}

export const Event = ({ event }: Props) => {
  const store = EventsStore;
  const [editMode, setEditMode] = useState(false);

  const deleteEvent = () => store.deleteEvent(event);
  const toggleMode = () => setEditMode(!editMode);

  const initialValues = Object.fromEntries(Object.entries(event));

  return (
    <li>
      <Formik
        //@ts-ignore
        initialValues={initialValues}
        validate={eventFormValidation}
        onSubmit={(values, formikHelpers: FormikHelpers<EventData>) => {
          handleEventEdit(values, formikHelpers, event, toggleMode);
        }}
      >
        <Form className="Event">
          <span className="Name">{event.eventName}</span>

          <DateInputField name="eventDate" disabled={!editMode} />
          <EventStartInputField name="eventStart" disabled={!editMode} />
          <InputField type="time" name="eventEnd" disabled={!editMode} />

          {editMode ? (
            <button type="submit">
              <img src={confirmChanges} alt="Done" />
            </button>
          ) : (
            <img onClick={toggleMode} src={editEventImg} alt="Edit" />
          )}

          <img
            className="Delete"
            src={deleteEventImg}
            alt="Delete"
            onClick={deleteEvent}
          />
        </Form>
      </Formik>
    </li>
  );
};
