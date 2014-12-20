'use strict';

var React = require('react');

var WeightStore = require('../../stores/weight');

var WeightTable = require('./table.jsx');
var WeightGraph = require('./graph.jsx');
var WeightAddButton = require('./add-button.jsx');

var WeightMain = React.createClass({

  getInitialState: function() {
    return {
      weights: []
    };
  },

  onWeightStoreChange: function() {
    this.setState({
      weights: WeightStore.models
    });
  },

  componentWillMount: function() {
    WeightStore.fetch();
    WeightStore.on('change reset add', this.onWeightStoreChange);
  },

  /**
   * Render component
   * @return {ReactElement}
   */
  render: function() {
    return (
      <div className="row">
        <h1> Weight </h1>
        <WeightGraph weights={this.state.weights}/>
        <WeightTable weights={this.state.weights}/>
        <WeightAddButton/>
      </div>
    );
  }

});

module.exports = WeightMain;
