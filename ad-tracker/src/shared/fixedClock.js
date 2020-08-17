const { addDays, subDays, addMinutes } = require("date-fns");

const fixedClock = (date) => {
  let returnDate = date;
  return {
    getTime() {
      return returnDate;
    },
    now() {
      returnDate = date;
    },
    daysAgo(x) {
      returnDate = subDays(date, x);
    },
    minutesFromNow(x) {
      returnDate = addMinutes(date, x);
    },
    daysFromNow(x) {
      returnDate = addDays(date, x);
    },
  };
};
module.exports = fixedClock;
