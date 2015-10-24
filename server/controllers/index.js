'use strict';

module.exports = function(router) {
  return router.get('/', function(req, res) {
    return res.send('ok');
  });
};
