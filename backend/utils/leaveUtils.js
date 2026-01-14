const isWeeklyOff = (date) => {
  const day = new Date(date).getDay();
  return day === 0 || day === 6; // Sunday or Saturday
};

const getBetweenDates = (start, end) => {
  const dates = [];
  let d = new Date(start);
  d.setDate(d.getDate() + 1);

  while (d < new Date(end)) {
    dates.push(d.toISOString().split("T")[0]);
    d.setDate(d.getDate() + 1);
  }
  return dates;
};

module.exports = {
  isWeeklyOff,
  getBetweenDates
};
