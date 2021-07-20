import { EventsArray } from "../../shared/types/EventsStoreTypes";

const comparator = (firstDate: string, secondDate: string) => {
  if (firstDate > secondDate) return 1;
  return -1;
};

export const sortByDate = (Events: EventsArray) => {
  const Dates = Object.keys(Events).sort(comparator);

  const sortedEvents: EventsArray = {};

  console.log(Dates);
  console.log("-------------");

  Dates.forEach((date) => (sortedEvents[date] = Events[date]));

  return sortedEvents;
};
