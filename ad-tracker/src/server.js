const application = require("./app");
const trackingModule =
  process.env.NODE_ENV === "production"
    ? require("./tracking/prodTrackingModule")
    : require("./tracking/devTrackingModule");
const clock = require("./shared/clock");

(async () => {
  const port = process.env.PORT || 3000;

  const trackingRouter = await trackingModule(clock);
  const app = application(trackingRouter);

  app.listen(port, () => {
    console.log(`Ad tracker listening on ${port}`);
  });
})();
