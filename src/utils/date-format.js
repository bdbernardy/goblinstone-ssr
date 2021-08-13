const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

const getLongDate = (date) => {
  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const dayOfMonth = date.getDate();
  const dayOfWeek = days[date.getDay()];

  return `${dayOfWeek}, ${month} ${dayOfMonth}, ${year}`;
};

export {getLongDate};
