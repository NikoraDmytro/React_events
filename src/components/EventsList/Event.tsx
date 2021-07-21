import { EventData } from "../../shared/types/EventsStoreTypes";
import editEvent from "./img/editEvent.png";
import deleteEvent from "./img/deleteEvent.png";
import confirmChanges from "./img/confirmChanges.png";
import { useState } from "react";

interface Props {
  event: EventData;
}

export const Event = ({ event }: Props) => {
  const [editMode, setEditMode] = useState(false);

  const handleClick = () => setEditMode(!editMode);

  const src = editMode ? confirmChanges : editEvent;
  const alt = editMode ? "Confirm" : "Edit";

  const date = editMode ? event.eventDate : "";

  return (
    <li key={event.eventId} className="Event">
      <p className="Name" title={event.eventName}>
        {event.eventName}
      </p>

      <input className="Date" value={date} disabled={!editMode} />
      <input className="Time" value={event.eventStart} disabled={!editMode} />
      <input className="Time" value={event.eventEnd} disabled={!editMode} />

      <img onClick={handleClick} className="Edit" src={src} alt={alt} />
      <img className="Delete" src={deleteEvent} alt="Delete" />
    </li>
  );
};
