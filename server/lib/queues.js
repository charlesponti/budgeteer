'use strict';

var amqp = require('amqp');
var util = require('util');

exports.setup = function(app) {

  // Connect to RabbitMQ
  app.rabbitmq = amqp.createConnection({
    host: 'localhost'
  });

  /**
   * Application's RabbitMQ queues
   * @type {object}
   */
  app.queues = {};

  /**
   * Make new RabbitMQ message queue
   * @param {string} name Name of queue
   */
  app.addQueue = function(name) {
    var msg;

    if (app.queues[name]) {
      msg = name+' queue already exists';
      util.log(msg);
    }

    app.queues[name] = app.rabbitmq.queue(name);
    msg = name+' queue is ready for use';
    util.log(msg);
  };

  /**
   * Retrive RabbitMQ queue
   * @param {string} name Name of queue
   */
  app.getQueue = function(name) {
    return app.queues[name];
  };

  /**
   * Application's RabbitMQ exchanges
   * @type {object}
   */
  app.exchanges = {};

  /**
   * Make new RabbitMQ message exchange
   * @param {string} name Name of exchange
   */
  app.addExchange = function(name) {
    var msg;

    if (app.exchanges[name]) {
      msg = name+' exchange already exists';
      util.log(msg);
    }

    app.exchanges[name] = app.rabbitmq.exchange(name);
    msg = name+' exchange is ready for use';
    util.log(msg);
  };

  /**
   * Retrive RabbitMQ queue
   * @param {string} name Name of queue
   */
  app.getExchange = function(name) {
    return app.exchanges[name];
  };

  // Log message when connected to RabbitMQ
  app.rabbitmq.on('ready', function() {
    app.logger.info('RabbitMQ connected.');
  });

};
