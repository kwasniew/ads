const addIP = (req, res, next) => {
  if (req.body)
    req.body.ip =
      req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  next();
};
module.exports = addIP;
