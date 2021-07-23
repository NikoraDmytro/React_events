import { EventData } from "../../shared/types/EventsStoreTypes";
import editEvent from "./img/editEvent.png";
import deleteEvent from "./img/deleteEvent.png";
import confirmChanges from "./img/confirmChanges.png";
import { useState } from "react";
import { DateInputField } from "./../inputs/DateInputField";
import { EventStartInputField } from "./../inputs/EventStartInputField";
import { InputField } from "./../inputs/InputField";
import { Form, Formik } from "formik";
import { eventFormValidation } from "./../../utils/validation/eventFormValidation";

interface Props {
  event: EventData;
}

export const Event = ({ event }: Props) => {
  const [editMode, setEditMode] = useState(false);

  const handleClick = () => setEditMode(!editMode);

  const initialValues = Object.fromEntries(Object.entries(event));

  return (
    <li>
      <Formik
        initialValues={initialValues}
        validationSchema={eventFormValidation}
        onSubmit={(values) => console.log(values)}
      >
        <Form className="Event">
          <p className="Name">{event.eventName}</p>

          <DateInputField name="eventDate" disabled={!editMode} />
          <EventStartInputField name="eventStart" disabled={!editMode} />
          <InputField type="time" name="eventEnd" disabled={!editMode} />

          {editMode ? (
            <img onClick={handleClick} src={confirmChanges} alt="Done" />
          ) : (
            <img onClick={handleClick} src={editEvent} alt="Edit" />
          )}

          <img className="Delete" src={deleteEvent} alt="Delete" />
        </Form>
      </Formik>
    </li>
  );
};
