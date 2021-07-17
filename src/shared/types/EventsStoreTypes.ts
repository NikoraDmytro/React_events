export type EventData = {
  eventId?: number;
  eventDate: string;
  eventName: string;
  eventStart: string;
  eventEnd: string;
};

export type EventsArray = {
  [date: string]: Array<EventData>;
};
