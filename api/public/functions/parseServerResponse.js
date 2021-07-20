const getDate = require("./getDate");
const toCamelCase = require("./toCamelCase");

const keysToCamelCase = (event) => {
  let newEvent = {};

  Object.entries(event).forEach(([key, value]) => {
    const camelCaseKey = toCamelCase(key);
    newEvent[camelCaseKey] = value;
  });

  return newEvent;
};

const NoSeconds = (time) => {
  if (time[1] === ":") {
    return "0" + time.slice(0, 4);
  }
  return time.slice(0, 5);
};

const parseServerResponse = (EventsArray) => {
  const ParsedArray = EventsArray.map((event) => {
    const parsedEvent = keysToCamelCase(event);

    parsedEvent.eventDate = getDate(event.event_date);
    parsedEvent.eventStart = NoSeconds(event.event_start);
    parsedEvent.eventEnd = NoSeconds(event.event_end);

    return parsedEvent;
  });

  return ParsedArray;
};

module.exports = parseServerResponse;
