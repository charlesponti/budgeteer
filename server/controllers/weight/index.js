'use strict';

module.exports = function(router) {
  return router.get('/', function(req, res) {
    req.send('weights!');
  });
};
