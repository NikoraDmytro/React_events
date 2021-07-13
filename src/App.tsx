import React from "react";

const InputField = ({ id, label, ...props }: { [x: string]: string }) => (
  <>
    <label htmlFor={id}>{label}</label>
    <input id={id} name={id} {...props} required />
  </>
);

const addZero = (number: number) => {
  return Math.floor(number / 10).toString() + (number % 10).toString();
};

const parseDate = (date: Date) => {
  const day = addZero(date.getDate());
  const month = addZero(date.getMonth() + 1);
  const year = date.getFullYear();

  return day + "." + month + "." + year;
};

export default function App(): JSX.Element {
  const now = new Date();
  const minDate = parseDate(now);
  const maxDate = "01.01.9999";

  return (
    <form>
      <h1>Добавить мероприятие</h1>
      <InputField id="eventName" label="Название" type="text" />
      <InputField
        id="eventDate"
        label="Дата"
        type="date"
        min={minDate}
        max={maxDate}
      />
      <InputField
        id="eventStart"
        label="Время начала"
        type="time"
        min="09:00"
        max="18:00"
      />
      <InputField id="eventEnd" label="Время конца" type="time" max="18:00" />
      <input type="submit" value="Добавить" />
    </form>
  );
}
