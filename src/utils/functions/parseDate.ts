const addZero = (number: number) => {
  return Math.floor(number / 10).toString() + (number % 10).toString();
};

export const parseDate = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return year + "-" + addZero(month) + "-" + addZero(day);
};
