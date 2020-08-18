const assert = require("assert");
const httpClient = require("supertest");
const application = require("./app");
const trackingModule = require("./tracking/devTrackingModule");
const fixedClock = require("./shared/fixedClock");
const { parseISO } = require("date-fns");

const command = (request) => (eventType) => (ad) =>
  request
    .post("/events")
    .send(
      JSON.stringify({
        type: eventType,
        ad,
      })
    )
    .set("Content-Type", "text/plain"); // simulate sendBeacon

const getReport = (request) => (day) => request.get(`/events?day=${day}`);

const appWithFixedDay = (day) => {
  const clock = fixedClock(parseISO(day));
  const trackingRouter = trackingModule(clock);
  const app = application(trackingRouter);
  return { app, clock };
};

const testActions = (app) => {
  const request = httpClient(app);
  const load = command(request)("load");
  const click = command(request)("click");
  const invalidEvent = command(request)("invalid_event");
  const dailyReport = getReport(request);
  return { load, click, invalidEvent, dailyReport };
};

describe("Ad tracker app", function () {
  it("tracks valid events", async function () {
    const SOME_DAY = "2020-02-12Z";
    const { app, clock } = appWithFixedDay(SOME_DAY);
    const { load, click, dailyReport } = testActions(app);

    await load("http://cloudinary.com").expect(202);
    await load("http://twitter.com");
    await click("http://twitter.com");
    clock.daysFromNow(1);
    await load("http://google.com");
    await click("http://google.com");

    const response = await dailyReport(SOME_DAY).expect(200);

    assert.deepStrictEqual(response.body, {
      "http://cloudinary.com": { load: 1 },
      "http://twitter.com": { load: 1, click: 1 },
    });
  });

  it("rejects invalid events", async function () {
    const SOME_DAY = "2020-02-12Z";
    const { app } = appWithFixedDay(SOME_DAY);
    const { invalidEvent, dailyReport } = testActions(app);

    await invalidEvent("http://cloudinary.com").expect(400);

    const response = await dailyReport(SOME_DAY);

    assert.deepStrictEqual(response.body, {});
  });
});
