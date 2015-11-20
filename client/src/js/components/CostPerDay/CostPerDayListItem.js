const History = ReactRouter.History;
import ItemActionButtons from '../../ItemActionButtons.js';
import CostPerDayStore from './CostPerDayStore.js';

const CostPerDayListItem = React.createClass({

  mixins: [History],

  _onEdit() {
    this.history.pushState(this.props.item, '/cost-per-day/new');
  },

  _onRemove() {
    return CostPerDayStore.remove(this.props.item).then(() => {
      this.history.pushState(null, '/cost-per-day');
    });
  },

  render() {
    var item = this.props.item;

    return (
      <li className="list-group-item" key={item.id}>
        <b>{item.name}</b>
                <span className="pull-right">
                    <ItemActionButtons edit={this._onEdit} remove={this._onRemove}/>
                </span>
        <span className="pull-right">{item.costPerDay}</span>
      </li>
    )
  }

});

export default CostPerDayListItem;
