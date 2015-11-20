const Link = ReactRouter.Link;
const WeightGraph = require('./graph');
const WeightStore = require('./WeightStore');
const WeightTable = require('./table');
const WeightAddButton = require('./add-button');

var Weight = React.createClass({
  propTypes: {
    initialData: React.PropTypes.array
  },

  getInitialState: function getInitialState() {
    return {
      weights: WeightStore.getRecords()
    };
  },

  onWeightStoreChange: function onWeightStoreChange() {
    return this.setState({
      weights: WeightStore.getRecords()
    });
  },

  componentWillMount: function componentWillMount() {
    WeightStore.addChangeListener(this.onWeightStoreChange);
  },

  componentWillUnmount: function componentWillUnmount() {
    WeightStore.removeChangeListener(this.onWeightStoreChange);
  },

  /**
   * Render component
   * @return {React.Component}
   */
  render: function weightRender() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <b> Weight </b>
          <Link className="btn pull-right" style={{padding:'0px'}} to="/weight/new">New</Link>
        </div>
        <div className="panel-body">
          <WeightGraph weights={this.state.weights}/>
          <WeightTable weights={this.state.weights}/>
        </div>
      </div>
    );
  }
});

module.exports = Weight;
