export default (err, req, res) => {
  const error = err.message ? err.message : err;
  const errorObject = {
    status: 500,
    message: error,
  };
  res.status(500).json(errorObject);
};
