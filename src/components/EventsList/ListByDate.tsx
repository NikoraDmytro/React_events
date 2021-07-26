import { EventData } from "../../shared/types/EventsStoreTypes";
import { normalizeDateFormat } from "../../utils/functions/parseDate";
import { ArrowButton } from "./ArrowButton";
import { Event } from "./Event";
import { useState } from "react";

interface Props {
  EventsByDate: EventData[];
  date: string;
}

export const ListByDate = ({ EventsByDate, date }: Props): JSX.Element => {
  const [firstElement, setFirstElement] = useState(0);

  return (
    <li className="EventListSection">
      <h3>{normalizeDateFormat(date)}</h3>

      <ul className="EventsByDate">
        <ArrowButton
          onClick={() => setFirstElement(firstElement - 1)}
          disabled={firstElement === 0}
          direction="top"
        />

        {EventsByDate.map((event, index) => {
          if (index >= firstElement)
            return <Event key={event.eventId} event={event} />;
          return null;
        })}

        <ArrowButton
          onClick={() => setFirstElement(firstElement + 1)}
          disabled={firstElement === EventsByDate.length - 1}
          direction="bottom"
        />
      </ul>
    </li>
  );
};
