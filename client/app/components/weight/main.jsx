'use strict';

var React = require('react');

var WeightStore = require('../../stores/weight');

var WeightGraph = require('./graph.jsx');
var WeightAddButton = require('./add-button.jsx');

var WeightMain = React.createClass({

  componentWillMount: function() {
    WeightStore.fetch();
  },

  /**
   * Render component
   * @return {ReactElement}
   */
  render: function() {
    return (
      <div class="row">
        <h1> Weight </h1>
        <WeightGraph/>
        <WeightAddButton/>
      </div>
    );
  }

});

module.exports = WeightMain;
