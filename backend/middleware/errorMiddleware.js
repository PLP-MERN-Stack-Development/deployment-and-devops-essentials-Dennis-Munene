const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  logger.error(err);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
  });
};

module.exports = { errorHandler };
