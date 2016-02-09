import React from 'react';
import { History } from 'react-router';

export default React.createClass({
  mixins: [History],

  onClick() {
    this.history.pushState(null, '/weight/new');
  },

  render() {
    return (
      <button onClick={this.onClick} className="btn add btn-default">
      +
      </button>
    );
  }

});
