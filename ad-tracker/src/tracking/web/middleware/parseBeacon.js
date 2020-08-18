const parseSendBeaconBody = (req, res, next) => {
  if (req.is("text/plain")) {
    req.body = JSON.parse(req.body);
  }
  next();
};

module.exports = parseSendBeaconBody;
