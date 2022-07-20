"use strict";

/* eslint-disable consistent-return, promise/no-callback-in-promise */

const boom = require("@hapi/boom");

/**
 * Wrapper for our async route handlers
 * @param {*} fn
 */
const asyncMiddleware = function(fn) {
  return function(req, res, next) {
    return Promise.resolve(fn(req, res, next)).catch(err => {
      if (!err.isBoom) return next(boom.badImplementation(err));
      next(err);
    });
  };
};

module.exports = asyncMiddleware;
