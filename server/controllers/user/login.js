'use strict';

module.exports = function(router) {
  return router.post('/', function(req, res) {
    req.login(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/users/' + req.user.username);
    });

    // Parse Log In
    //Parse.User.logIn(username, password, {
    //  success: function(user) {
    //    console.log(user);
    //    req.session.token = user._sessionToken;
    //    res.sendStatus(200);
    //  },
    //  error: function(user, error) {
    //    res.status(400).send(error);
    //  }
    //});
  });
};
