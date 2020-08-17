const eventRepository = require("./repository/influxEventRepository.js");
const trackingController = require("./web/trackingController.js");
const trackingRouter = require("./web/trackingRouter.js");
const init = require("../shared/db");

const trackingModule = async (clock) => {
  const db = await init({ dbName: "ad_tracker" });
  const repository = eventRepository({
    db,
    clock,
    batchSize: process.env.INFLUX_BATCH
  });
  const controller = trackingController({ eventRepository: repository, clock });
  return trackingRouter(controller);
};

module.exports = trackingModule;
