const toCamelCase = (string) => {
  const WordsArray = string.split("_").map((word, index) => {
    if (!index) return word;

    const newWord = word[0].toUpperCase() + word.slice(1);

    return newWord;
  });

  const camelCaseString = WordsArray.join("");

  return camelCaseString;
};

module.exports = toCamelCase;
