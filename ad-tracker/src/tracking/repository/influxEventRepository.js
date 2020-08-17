const { merge } = require("lodash");
const { addDays, formatISO } = require("date-fns");

const eventRepository = ({ db, clock, batchSize = 1 }) => {
  let points = [];
  return {
    async store(event) {
      points.push({
        measurement: "ad_events",
        fields: { ip: event.ip || "unknown" }, // influx required at least one field so I decided to add IP
        tags: { event: event.type, ad: event.ad, uniq: points.length },
        timestamp: clock.getTime(),
      });
      // batching data points so that we don't send them one by one over HTTP
      // eventually, this code should be provided by the influx-node driver instead of me writing it
      if (points.length >= batchSize) {
        const copyPoints = points;
        points = [];
        await db.writePoints(copyPoints);
      }
    },
    async getDailyReport(day) {
      const today = formatISO(day, { representation: "date" });
      const tomorrow = formatISO(addDays(day, 1), { representation: "date" });

      const result = await db.query(
        `select count(ip) from ad_events where time >= '${today}' and time < '${tomorrow}' group by ad, event`
      );
      return result.groups().reduce((acc, curr) => {
        return merge(acc, {
          [curr.tags.ad]: { [curr.tags.event]: curr.rows[0].count },
        });
      }, {});
    },
  };
};

module.exports = eventRepository;
