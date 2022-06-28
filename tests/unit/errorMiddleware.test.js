"use strict";

const winston = require("../../src/utils/logger/winston");
const mocha = require("mocha");
const { expect } = require("chai");
const sinon = require("sinon");

const {
  exitProcess,
  uncaughtExceptionHandler,
  errorDecorator,
  finalErrorHandler,
  unhandledRejectionHandler
} = require("../../src/utils/errorMiddleware.js");

describe("Helper functions  from errorMiddleware", function() {
  describe("Funxtion exitProcess", function() {
    it('when called should exit process with "1" as argument', function() {
      const exit = sinon.stub(process, "exit");

      exitProcess();

      sinon.assert.calledWith(exit, 1);

      exit.restore();
    });
  });

  describe("Function unhandledRejectionHandler", function() {
    it('should call "winston.error" with "reason", "message" and "p" arguments', function() {
      const error = sinon.stub(winston, "error");

      const reason = new Error("");
      const p = {};

      unhandledRejectionHandler(reason, p);

      sinon.assert.calledWithExactly(error, {
        reason,
        message: "Unhandled Rejection at Promise",
        p
      });

      error.restore();
    });
  });

  describe("Function uncaughtExceptionHandler", () => {
    it('should call "winston.error" with "err" as an argument', function() {
      const error = sinon.stub(winston, "error");
      const exit = sinon.stub(process, "exit");

      const err = new Error("Error");

      uncaughtExceptionHandler(err);

      sinon.assert.calledWith(error, err);

      error.restore();
      exit.restore();
    });

    it('should exit process with "1" as argument', function() {
      const exit = sinon.stub(process, "exit");
      const error = sinon.stub(winston, "error");

      const err = new Error("Error");

      uncaughtExceptionHandler(err);

      sinon.assert.calledWith(exit, 1);

      error.restore();
      exit.restore();
    });
  });

  describe.skip("Function errorDecorator", () => {
    it("should skip this", function() {});
  });

  describe.skip("Function finalErrorHandler", () => {
    it("should skip this", function() {});
  });
});
