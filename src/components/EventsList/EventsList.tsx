import React from "react";
import { observer } from "mobx-react";

import { EventsStore } from "./../../stores/EventsStore";
import { ListByDate } from "./ListByDate";
import "./EventsList.scss";

export const EventsList = observer(() => {
  const Events = EventsStore.Events;
  const isFetched = EventsStore.dataFetched;

  if (!isFetched) {
    EventsStore.getEvents();
  }

  return (
    <ul className="EventsList">
      {Object.keys(Events).map((date) => (
        <ListByDate EventsByDate={Events[date]} date={date} />
      ))}
    </ul>
  );
});
