const supportedEvents = ["click", "load"];
const isEventValid = (event) => {
  return supportedEvents.includes(event.type);
};

const validateEventMiddleware = (req, res, next) => {
  isEventValid(req.body) ? next() : res.status(400).end();
};

module.exports = { isEventValid, validateEventMiddleware };
