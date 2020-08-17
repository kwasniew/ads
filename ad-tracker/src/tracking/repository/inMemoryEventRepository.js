const { isSameDay } = require("date-fns");
const { chain } = require("lodash");

const eventRepository = (clock) => {
  const events = [];

  return {
    async store(event) {
      events.push({ timestamp: clock.getTime(), ...event });
    },
    async getDailyReport(day) {
      return chain(events)
        .filter((event) => isSameDay(event.timestamp, day))
        .groupBy((event) => event.ad)
        .mapValues((events) =>
          chain(events)
            .groupBy((event) => event.type)
            .mapValues((events) => events.length)
            .value()
        )
        .value();
    },
  };
};
module.exports = eventRepository;
