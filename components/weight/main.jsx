'use strict';

var React = require('react');

var WeightGraph = require('./graph.jsx');
var WeightStore = require('../../client/stores/weight');
var WeightTable = require('./table.jsx');
var WeightAddButton = require('./add-button.jsx');

var WeightMain = React.createClass({

  propTypes: {
    initialData: React.PropTypes.array
  },

  getInitialState: function() {
    return {
      weights: this.props.initialData || []
    };
  },

  onWeightStoreChange: function() {
    return this.setState({
      weights: WeightStore.models
    });
  },

  componentWillMount: function() {
    WeightStore.on('change reset add', this.onWeightStoreChange);
    if (!this.state.weights.length) {
      return WeightStore.fetch();
    }
    return this;
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
