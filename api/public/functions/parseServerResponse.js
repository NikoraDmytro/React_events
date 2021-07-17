const toCamelCase = (string) => {
  const WordsArray = string.split("_");

  WordsArray.foreach((word) => {
    word[0].toUpperCase();
  });

  const camelCaseString = WordsArray.join("");

  return camelCaseString;
};

const parseServerResponse = (EventsArray) => {
  const ParsedArray = EventsArray.map((event) => {
    const Keys = Object.keys(event);

    const CamelCaseKeys = Keys.map((key) => {
      return toCamelCase(key);
    });

    return Object.assign(CamelCaseKeys, Object.values(event));
  });

  return ParsedArray;
};

module.exports = parseServerResponse;
