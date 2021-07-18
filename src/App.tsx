import React from "react";
import { AddEventForm } from "./components/AddEventForm/AddEventForm";
import { EventsList } from "./components/EventsList/EventsList";

export default function App(): JSX.Element {
  return (
    <>
      <EventsList />
      <AddEventForm />
    </>
  );
}
