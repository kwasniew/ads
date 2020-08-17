const eventRepository = require("./repository/inMemoryEventRepository.js");
const trackingController = require("./web/trackingController.js");
const trackingRouter = require("./web/trackingRouter.js");

const trackingModule = (clock) => {
  const repository = eventRepository(clock);
  const controller = trackingController({ eventRepository: repository, clock });
  return trackingRouter(controller);
};

module.exports = trackingModule;
