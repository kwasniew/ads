const eventRepository = require("./inMemoryEventRepository.js");
const { parseISO } = require("date-fns");
const fixedClock = require("../../shared/fixedClock.js");
const assert = require("assert");

describe("In-memory event repository", function () {
  it("returns daily report", async function () {
    const timestamp = parseISO("2018-02-12Z");
    const clock = fixedClock(timestamp);
    const repository = eventRepository(clock);

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
