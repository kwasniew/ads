const { parseISO, formatISO } = require("date-fns");

const trackingController = ({ eventRepository, clock }) => ({
  recordEvent(req, res) {
    const event = req.body;

    // purposefully don't wait on the service
    eventRepository.store(event);

    res.status(202).end();
  },
  async getReport(req, res) {
    const day = parseISO(req.query.day);
    if (!(day instanceof Date))
      res
        .status(400)
        .send("Please specify day in the following format e.g. 2012-02-24");

    res.json(await eventRepository.getDailyReport(day));
  },
  async landing(req, res) {
    res.send(`
            <h2>Ad Tracker Explorer</h2>
            <h3>Find events from the current day</h3>
            <a href="/events?day=${formatISO(clock.getTime(), {
              representation: "date",
            })}Z">events today</a>
            <h3>Simulate events</h3>
            <form method="POST" action="/events">
                <input type="hidden" name="type" value="click"/>
                <input type="hidden" name="ad" value="http://example.com"/>
                <input type="submit" value="Simulate click"/>
            </form>
        `);
  },
});
module.exports = trackingController;
