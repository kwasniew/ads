const createEventRepository = require("./influxEventRepository.js");
const init = require("../../shared/db.js");
const fixedClock = require("../../shared/fixedClock.js");
const realClock = require("../../shared/clock.js");
const assert = require("assert");

const eventRepository = async (clock) => {
  const db = await init({ dbName: "testdb", drop: true });
  return createEventRepository({ db, clock, batchSize: 1 });
};

// future idea: copy paste from in memory repo test - consider creating a repo contract test
process.env.INFLUX_HOST && describe("Influx event repository", function () {
  it("returns daily report", async function () {
    this.timeout(10000);
    const timestamp = realClock.getTime();
    const clock = fixedClock(timestamp);
    const repository = await eventRepository(clock);

    // ignore
    clock.daysAgo(1);
    await repository.store({ ad: "http://cloudinary.com", type: "load" });

    // store
    clock.now();
    await repository.store({ ad: "http://twitter.com", type: "load" });
    clock.minutesFromNow(1);
    await repository.store({ ad: "http://goodreads.com", type: "load" });
    await repository.store({ ad: "http://twitter.com", type: "click" });

    // ignore
    clock.daysFromNow(1);
    await repository.store({ ad: "http://google.com", type: "load" });

    const report = await repository.getDailyReport(timestamp);

    assert.deepStrictEqual(report, {
      "http://goodreads.com": { load: 1 },
      "http://twitter.com": { load: 1, click: 1 },
    });
  });
});
