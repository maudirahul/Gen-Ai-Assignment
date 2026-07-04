export const errorHandler = (err, req, res, next) => {
  console.error("[Global Error Handler]:", err);

  res.status(err.status || 500).json({
    error: err.name || "InternalServerError",
    message: err.message || "An unexpected server error occurred.",
  });
};
