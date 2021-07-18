import React from "react";
import { observer } from "mobx-react";

import { EventsStore } from "./../../stores/EventsStore";
import { normalizeDateFormat } from "../../utils/functions/parseDate";

const NoSeconds = (time: string) => {
  if (time[1] === ":") {
    return "0" + time.slice(0, 4);
  }
  return time.slice(0, 5);
};

export const EventsList = observer(() => {
  const Events = EventsStore.Events;
  const isFetched = EventsStore.dataFetched;

  if (!isFetched) {
    EventsStore.getEvents();
  }

  return (
    <ul>
      {Object.keys(Events).map((date) => (
        <li key={date}>
          {date}
          <ul>
            {Events[date].map((event) => (
              <li key={event.eventId}>
                {event.eventName}
                <br />
                {normalizeDateFormat(event.eventDate)}
                <br />
                {NoSeconds(event.eventStart)}
                <br />
                {NoSeconds(event.eventEnd)}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
});
