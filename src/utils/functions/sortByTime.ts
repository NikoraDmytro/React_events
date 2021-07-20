import { EventData } from "../../shared/types/EventsStoreTypes";

const comparator = (firstEvent: EventData, secondEvent: EventData) => {
  if (firstEvent.eventStart > secondEvent.eventStart) return 1;
  return -1;
};

export const sortByTime = (Events: EventData[]) => {
  Events.sort(comparator);

  return Events;
};
