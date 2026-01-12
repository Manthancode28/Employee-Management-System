const Holiday = require("../models/Holiday");

const getDateRange = (from, to) => {
  const dates = [];
  let current = new Date(from);
  const end = new Date(to);

  while (current <= end) {
    dates.push(current.toISOString().split("T")[0]);
    current.setDate(current.getDate() + 1);
  }

  return dates;
};

const isSunday = (date) => new Date(date).getDay() === 0;

const isHoliday = async (date) => {
  const holiday = await Holiday.findOne({ date });
  return !!holiday;
};

module.exports = {
  getDateRange,
  isSunday,
  isHoliday
};
