import { flow, makeAutoObservable } from "mobx";
import type {
  EventData,
  EventsArray,
  ServerResponseType,
} from "../shared/types/EventsStoreTypes";
import axios from "axios";
import { sortByDate } from "./../utils/functions/sortByDate";
import { sortByTime } from "./../utils/functions/sortByTime";

const address = `http://localhost:3002/api`;

class Events {
  Events: EventsArray;
  dataFetched: boolean;

  constructor() {
    this.Events = {};
    this.dataFetched = false;
    this.getEvents = this.getEvents.bind(this);
    this.addNewEvent = this.addNewEvent.bind(this);
    makeAutoObservable(this);
  }

  getEvents = flow(function* (
    this: Events
  ): Generator<any, void, ServerResponseType> {
    this.dataFetched = false;
    try {
      const response = yield axios.get(address);
      const Data = response.data;

      let FetchedEvents: EventsArray = {};

      Data.forEach((event) => {
        const date = event.eventDate;

        if (!FetchedEvents[date]) FetchedEvents[date] = [];
        FetchedEvents[date].push(event);
      });

      this.Events = FetchedEvents;
      this.dataFetched = true;
    } catch (err) {
      console.log(err);
    }
  });

  addNewEvent = flow(function* (this: Events, event: EventData) {
    try {
      const serverResponse = yield axios.post(address + "/add_event", event);
      if (serverResponse) alert("Мероприятие добавлено!");

      const date = event.eventDate;
      let Events = this.Events;

      if (!Events[date]) {
        Events[date] = [];
      }
      Events[date].push(event);
      Events[date] = sortByTime(Events[date]);

      this.Events = { ...sortByDate(Events) };
    } catch (err) {
      throw err;
    }
  });

  deleteEvent = flow(function* (this: Events, event: EventData) {
    try {
      const serverResponse = yield axios.delete(
        address + "/delete_event/" + event.eventId
      );
      if (serverResponse) alert("Мероприятие удалено!");

      const date = event.eventDate;
      let Events = this.Events;

      if (Events[date].length === 1) {
        delete Events[date];
      } else {
        Events[date] = Events[date].filter((item) => {
          return item.eventId !== event.eventId;
        });
      }

      this.Events = { ...Events };
    } catch (err) {
      throw err;
    }
  });

  editEvent = flow(function* (
    this: Events,
    event: EventData,
    previousEvent: EventData
  ) {
    try {
      const serverResponse = yield axios.post(address + "/edit_event", {
        ...event,
        eventId: previousEvent.eventId,
      });
      if (serverResponse) alert("Мероприятие изменено!");

      const date = previousEvent.eventDate;
      const newDate = event.eventDate;
      let Events = this.Events;

      if (date !== newDate) {
        if (Events[date].length === 1) {
          delete Events[date];
        } else {
          Events[date] = Events[date].filter((item) => {
            return item.eventId !== event.eventId;
          });
        }

        if (!Events[newDate]) {
          Events[newDate] = [];
        }
        Events[newDate].push(event);
      } else {
        const index = Events[date].findIndex(
          (item) => item.eventId === event.eventId
        );

        Events[date][index] = event;
      }

      Events[newDate] = sortByTime(Events[newDate]);

      this.Events = { ...sortByDate(Events) };
    } catch (err) {
      throw err;
    }
  });
}

export const EventsStore = new Events();
