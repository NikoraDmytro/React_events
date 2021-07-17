import { flow, makeAutoObservable } from "mobx";
import type { EventData, EventsArray } from "../shared/types/EventsStoreTypes";
import axios from "axios";

const address = `http://localhost:3002/api`;

class Events {
  Events: EventsArray | [];

  constructor() {
    this.Events = [];
    this.getEvents = this.getEvents.bind(this);
    this.addNewEvent = this.addNewEvent.bind(this);
    makeAutoObservable(this);
  }

  getEvents = flow(function* (this: Events): Generator<any, void, EventData[]> {
    try {
      const Data = yield axios.get(address);

      let FetchedEvents: EventsArray = {};

      Data.forEach((event) => {
        const date = event.eventDate;

        FetchedEvents[date].push(event);
      });

      this.Events = FetchedEvents;
    } catch (err) {
      console.log(err);
    }
  });

  addNewEvent = flow(function* (this: Event, event: EventData) {
    try {
      const serverResponse = yield axios.post(address + "/add_event", event);

      console.log(serverResponse);
    } catch (err) {
      throw err;
    }
  });
}

export const EventsStore = new Events();
