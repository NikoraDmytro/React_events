const addZero = (number) => {
  return Math.floor(number / 10).toString() + (number % 10).toString();
};

const getDate = () => {
  const now = new Date();
  const day = now.getDate();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  return year + "-" + addZero(month) + "-" + addZero(day);
};

module.exports = getDate;
