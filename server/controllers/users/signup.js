'use strict';

module.exports = function(router) {
  return router.post('/', function(req, res) {
    var user = new Parse.User();

    user.set("username", req.body.email);
    user.set("password", req.body.password);

    user.signUp(null, {
      success: function(user) {
        return res.json({message: 'User signed up!', user: user});
      },
      error: function(user, error) {
        return res.json(500, {message: error});
      }
    });
  });
};
