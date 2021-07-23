import { EventData } from "../../shared/types/EventsStoreTypes";
import { normalizeDateFormat } from "../../utils/functions/parseDate";
import { Event } from "./Event";

interface Props {
  EventsByDate: EventData[];
  date: string;
}

export const ListByDate = ({ EventsByDate, date }: Props): JSX.Element => {
  return (
    <li className="EventListSection">
      <h3>{normalizeDateFormat(date)}</h3>
      <ul className="EventsByDate">
        {EventsByDate.map((event) => (
          <Event key={event.eventId} event={event} />
        ))}
      </ul>
    </li>
  );
};
