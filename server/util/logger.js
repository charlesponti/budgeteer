'use strict';

var fs = require('fs');
var path = require('path');
var winston = require('winston');
var logFile = path.resolve(__dirname, '../logs/all-logs.log');

if (!fs.existsSync(logFile)) {
  fs.writeFileSync(logFile);
}

winston.emitErrs = true;

var logger = new winston.Logger({
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: logFile,
      handleExceptions: true,
      json: true,
      maxsize: 5242880, //5MB
      maxFiles: 5,
      colorize: false
    }),
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true
    })
  ],
  exitOnError: false
});

module.exports = logger;
module.exports.stream = {
  write: function(message, encoding) {
    logger.info(message);
  }
};
