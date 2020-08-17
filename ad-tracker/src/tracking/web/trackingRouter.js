const { Router } = require("express");
const { validateEventMiddleware } = require("./middleware/validateEvent.js");
const addIP = require("./middleware/addIP.js");
const parseSendBeaconBody = require("./middleware/parseBeacon.js");
const cors = require("cors");

const trackingRouter = ({ recordEvent, getReport, landing }) => {
  const router = Router();

  router.get("/", landing);
  router.post(
    "/events",
    cors(),
    parseSendBeaconBody,
    validateEventMiddleware,
    addIP,
    recordEvent
  );
  router.get("/events", getReport);

  return router;
};
module.exports = trackingRouter;
