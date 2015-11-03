'use strict';

module.exports = function(router) {
  return router.post('/', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    Parse.User.logIn(username, password, {
      success: function(user) {
        console.log(user);
        req.session.token = user._sessionToken;
        res.sendStatus(200);
      },
      error: function(user, error) {
        res.status(400).send(error);
      }
    });
  });
};
