const addZero = (number: number) => {
  const tens = Math.floor(number / 10).toString();
  const units = (number % 10).toString();

  return tens + units;
};

export const parseDate = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return year + "-" + addZero(month) + "-" + addZero(day);
};

export const normalizeDateFormat = (strangeFormatDate: string) => {
  const date = new Date(strangeFormatDate);

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return addZero(day) + "." + addZero(month) + "." + year;
};
