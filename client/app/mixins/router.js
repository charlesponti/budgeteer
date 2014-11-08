'use strict';

module.exports = {

  onRouteChange: function() {
    this.forceUpdate();
  },

  componentWillMount: function() {
    this.props.router.on('route', this.onRouteChange);
  },

  componentWillUnmount: function() {
    this.props.router.off('route', this.onRouteChange);
  }

};
