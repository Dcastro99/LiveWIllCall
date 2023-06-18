export default function handle404(req, res) {
  const errorObject = {
    status: 404,
    message: "Sorry, these are not the drones you were looking for",
  };

  res.status(404).json(errorObject);
}
