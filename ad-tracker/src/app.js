const express = require("express");

const { notFound, serverError } = require("./shared/error");

const application = (trackingRouter) => {
  const app = express();
  const limit = "1kB";
  app.use(express.text({ limit })); // for sendBeacon
  app.use(express.json({ limit })); // for testing
  app.use(express.urlencoded({ extended: false, limit })); // for testing

  app.use(trackingRouter);

  app.use(notFound);
  app.use(serverError);

  return app;
};

module.exports = application;
