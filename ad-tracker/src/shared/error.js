const notFound = (req, res) => {
  res.status(404);
  res.send("Not Found");
};

const serverError = (err, req, res, next) => {
  console.error(err);
  res.status(500);
  res.send("Server Error");
};

module.exports = { notFound, serverError };
