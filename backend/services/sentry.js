const Sentry = require('@sentry/node');

const initSentry = () => {
  const dsn = process.env.SENTRY_DSN;
  if (!dsn) return null;
  Sentry.init({
    dsn,
    tracesSampleRate: 0.2,
    environment: process.env.NODE_ENV || 'development'
  });
  return Sentry;
};

module.exports = initSentry;
