import React, { useState } from "react";
import { observer } from "mobx-react";

import { EventsStore } from "./../../stores/EventsStore";
import { ListByDate } from "./ListByDate";
import "./EventsList.scss";
import { useListPadding } from "./../../utils/hooks/useListPadding";
import { ArrowButton } from "./ArrowButton";

export const EventsList = observer(() => {
  const Events = EventsStore.Events;
  const isFetched = EventsStore.dataFetched;
  const [listElement, setListElement] = useState<HTMLUListElement>();
  const [firstElement, setFirstElement] = useState(0);
  const Dates = Object.keys(Events);

  if (!isFetched) {
    EventsStore.getEvents();
  }

  const getListRef = (element: HTMLUListElement) => {
    if (element && element.firstElementChild) setListElement(element);
  };

  const style = useListPadding(listElement);

  return (
    <div className="EventsListContainer">
      <ArrowButton
        onClick={() => setFirstElement(firstElement - 1)}
        disabled={firstElement === 0}
        direction="left"
      />

      <ul className="EventsList" ref={getListRef} style={style}>
        {Dates.map((date, index) => {
          if (index >= firstElement) {
            return (
              <ListByDate key={date} EventsByDate={Events[date]} date={date} />
            );
          }
          return null;
        })}
      </ul>

      <ArrowButton
        onClick={() => setFirstElement(firstElement + 1)}
        disabled={firstElement === Dates.length - 1}
        direction="right"
      />
    </div>
  );
});
