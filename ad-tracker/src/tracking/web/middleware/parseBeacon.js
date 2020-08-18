const parseSendBeaconBody = (req, res, next) => {
  // sendBeacon can't send application/json content-type
  if (req.is("text/plain")) {
    req.body = JSON.parse(req.body);
  }
  next();
};

module.exports = parseSendBeaconBody;
