import React from "react";
import { observer } from "mobx-react";

import { EventsStore } from "./../../stores/EventsStore";
import { normalizeDateFormat } from "../../utils/functions/parseDate";

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
          {normalizeDateFormat(date)}
          <ul>
            {Events[date].map((event) => (
              <li key={event.eventId}>
                {event.eventName}
                <br />
                {event.eventStart}
                <br />
                {event.eventEnd}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
});
