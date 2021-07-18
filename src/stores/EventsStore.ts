import { flow, makeAutoObservable } from "mobx";
import type {
  EventData,
  EventsArray,
  ServerResponseType,
} from "../shared/types/EventsStoreTypes";
import axios from "axios";

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
      const Events = this.Events;

      if (!Events[date]) Events[date] = [];

      Events[date].push(event);

      this.Events = { ...Events };
    } catch (err) {
      throw err;
    }
  });
}

export const EventsStore = new Events();
