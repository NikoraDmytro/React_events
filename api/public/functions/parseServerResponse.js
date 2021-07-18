const toCamelCase = (string) => {
  const WordsArray = string.split("_").map((word, index) => {
    if (!index) return word;

    const newWord = word[0].toUpperCase() + word.slice(1);

    return newWord;
  });

  const camelCaseString = WordsArray.join("");

  return camelCaseString;
};

const parseServerResponse = (EventsArray) => {
  const ParsedArray = EventsArray.map((event) => {
    const parsedEvent = {};

    Object.keys(event).forEach((key) => {
      const CamelCaseKey = toCamelCase(key);
      parsedEvent[CamelCaseKey] = event[key];
    });

    return parsedEvent;
  });

  return ParsedArray;
};

module.exports = parseServerResponse;
