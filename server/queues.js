'use strict';

// Connect to RabbitMQ
app.rabbitConnection = amqp.createConnection({
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

  app.queues[name] = app.rabbitConnection.queue(name);
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

  app.exchanges[name] = app.rabbitConnection.exchange(name);
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
app.rabbitConnection.on('ready', function() {
  app.logger.info('RabbitMQ connected.');
});
