"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const config = require("config");
const Sentry = require("@sentry/node");
const packageJson = require("../package.json");
const { stderrStream, stdoutStream } = require("./utils/logger/morgan");

require("dotenv").config();

const {
  errorDecorator,
  finalErrorHandler,
  notFoundErrorHandler,
  unhandledRejectionHandler,
  uncaughtExceptionHandler
} = require("./utils/errorMiddleware");

const app = express();

/**
 * SENTRY initialization
 */
Sentry.init({
  dsn: config.get("sentry.dsn"),
  environment: process.env.NODE_ENV,
  release: packageJson.version
});

/**
 * SENTRY: The request handler must be the first middleware on the app
 */
app.use(Sentry.Handlers.requestHandler());

/**
 * Connect DBs
 *
 * Sequelize:
 */
const { sequelizeConnect } = require("../src/db");
sequelizeConnect();

/**
 * Require modules conditionally
 */
require("./utils/conditionalRequire")(app);

/**
 * Helmet helps to secure Express apps by setting various HTTP headers.
 */
app.use(helmet());

/**
 * Get NODE_ENV from environment and store in Express.
 */
app.set("env", process.env.NODE_ENV);

/**
 * When running Express app behind a proxy we need to detect client IP address correctly.
 * For NGINX the following must be configured 'proxy_set_header X-Forwarded-For $remote_addr;'
 * @link http://expressjs.com/en/guide/behind-proxies.html
 */
app.set("trust proxy", true);

/**
 * Morgan logger
 */
app.use(stderrStream, stdoutStream);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// App Controller
app.use(require("./controller"));

/**
 * ERROR HANDLING
 */

/**
 * SENTRY: The error handler must be before any other error middleware
 */
app.use(Sentry.Handlers.errorHandler());

/**
 * Catch 404 and forward to error handler
 */
app.use(notFoundErrorHandler);

/**
 * The 'unhandledRejection' event is emitted whenever a Promise is rejected and
 * no error handler is attached to the promise.
 */
process.on("unhandledRejection", unhandledRejectionHandler);

/**
 * The 'uncaughtException' event is emitted when an uncaught JavaScript exception
 * bubbles all the way back to the event loop omitting Express.js error handler.
 *
 * !!! WARNING !!!
 * It is not safe to resume normal operation after 'uncaughtException'.
 * @link https://nodejs.org/api/process.html#process_warning_using_uncaughtexception_correctly
 */
process.on("uncaughtException", uncaughtExceptionHandler);

/**
 * Decorate error object with additional data
 */
app.use(errorDecorator);

/**
 * Custom error handling middleware - final
 * WARNING: Must be defined last, after other app.use(), routes calls
 * and all other error handling middleware
 */
app.use(finalErrorHandler);

module.exports = app;
