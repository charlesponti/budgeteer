/**
 * Created by charlesponti on 21/03/2015.
 */

var path = require('path');

module.exports = (function() {

  global.appRequire = function(name) {
    return require(path.join(__dirname, name));
  };

})();

