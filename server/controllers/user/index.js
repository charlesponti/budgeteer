'use strict';

module.exports = function(router) {
  return router.post('/', function(req, res, next) {
    const accessToken = req.body.accessToken;
    const userID = req.body.userID;
    const query = {
      id: userID,
      accessToken: accessToken
    };

    User.findOne(query, function (err, user) {
      if (err) {
        return next(err);
      }

      else if (user) {
        return res.json({user:user});
      }

      else if (req.body.userID) {
        new User(query).save(function(err, user) {
          if (err) {
            return next(err);
          }

          return res.json({user:user});
        });
      }

      else {
        return res.status(500).json({
          error: 'Please supply Facebook User ID'
        });
      }
    });
  });
};
