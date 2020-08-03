function errorResponse({statusCode=500, response={}, ...otherProps}, req, res, next) {
  console.log(statusCode);
  console.log(response);
  console.log(otherProps);
  console.log(`== FAILED ==`);
  if (response.hasOwnProperty('body')) {
    const {message=[]} = response.body;

    if (statusCode === 400) {
      res.status(statusCode).json({
        error: message,
      });
    } else if (statusCode === 401) {
      res.status(statusCode).json({
        error: message,
      });
    } else {
      res.status(500).json({
        error: message,
      });
    }
  } else {
    res.status(500).json({});
  }
}

module.exports = errorResponse;
