'use strict';

module.exports = function(router) {
  router.get('/', function(req, res) {
    return res.json(req.user);
  });
};
