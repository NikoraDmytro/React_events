import React, { useState } from "react";
import { observer } from "mobx-react";

import { EventsStore } from "./../../stores/EventsStore";
import { ListByDate } from "./ListByDate";
import "./EventsList.scss";
import { useListPadding } from "./../../utils/hooks/useListPadding";

export const EventsList = observer(() => {
  const Events = EventsStore.Events;
  const isFetched = EventsStore.dataFetched;
  const [listElement, setListElement] = useState<HTMLUListElement>();

  if (!isFetched) {
    EventsStore.getEvents();
  }

  const getListRef = (element: HTMLUListElement) => {
    if (element && element.firstElementChild) setListElement(element);
  };

  const style = useListPadding(listElement);

  return (
    <ul className="EventsList" ref={getListRef} style={style}>
      {Object.keys(Events).map((date) => (
        <ListByDate key={date} EventsByDate={Events[date]} date={date} />
      ))}
    </ul>
  );
});
