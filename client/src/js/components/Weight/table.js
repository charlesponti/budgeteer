const classnames = require('classnames');
const ItemActionButtons = require('../../ItemActionButtons');
const WeightStore = require('./WeightStore');

const WeightTable = React.createClass({

  mixins: [ReactRouter.History],

  propTypes: {
    weights: React.PropTypes.array.isRequired
  },

  onEdit: function onWeightEdit(weight) {
    this.history.pushState(weight, '/weight/new');
  },

  onRemove: function onWeightRemove(weight) {
    var answer = window.confirm(`
      Are you sure you want to delete this weight?
    `);

    if (answer) {
      WeightStore.remove(weight);
    }
  },

  render: function onWeightRender() {
    var classes = classnames({
      'table': true,
      'hover': true,
      // Hide table if no weights
      'hide': this.props.weights.length === 0
    });

    return (
      <table className={classes}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Weight</th>
          </tr>
        </thead>
        <tbody>
          {this.props.weights.map((weight) => {
            return (
              <tr key={weight.id}>
                <td>{weight.getDate().toLocaleString()}</td>
                <td>{weight.kgs + ' kgs'}</td>
                <td>
                  <ItemActionButtons edit={this.onEdit.bind(this, weight)}
                                     remove={this.onRemove.bind(this, weight)}/>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

});

module.exports = WeightTable;
