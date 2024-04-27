const errorHandler = (err, req, res, next) => {
  // Log the error for debugging (optional)
  console.error(err);

  // Set default error status and message
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  if (err.name === "CastError") {
    statusCode = 400;
    message = `Bootcamp not found with id of ${err.value}`;
  }

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((error) => error.message)
      .join(", ");
  }

  if (err.code === 11000) {
    statusCode = 400; // Bad Request
    message = "Duplicate key error";
  }

  // Send the error response
  res.status(statusCode).json({ success: false, error: message });
};

module.exports = errorHandler;
