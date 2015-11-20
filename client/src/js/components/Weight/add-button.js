const History = ReactRouter.History;

var WeightAddButton = React.createClass({
  mixins: [History],

  onClick: function() {
    this.history.pushState(null, '/weight/new');
  },

  render: function() {
    return (
      <button onClick={this.onClick} className="btn add btn-default">
      +
      </button>
    );
  }

});

module.exports = WeightAddButton;
