const Link = ReactRouter.Link;
import CostPerDayStore from './CostPerDayStore.js';
import CostPerDayListItem from './CostPerDayListItem.js';

const CostPerDay = React.createClass({

  getInitialState() {
    return {
      items: CostPerDayStore.getRecords(),
      formItem: {}
    }
  },

  componentWillMount() {
    this.listStyle = {
      maxWidth: '600px',
      margin: '0 auto'
    };

    CostPerDayStore.addChangeListener(this._onCostPerDayStoreChange);
  },

  componentWillUnmount() {
    CostPerDayStore.removeChangeListener(this._onCostPerDayStoreChange);
  },

  _onCostPerDayStoreChange() {
    return this.setState({
      items: CostPerDayStore.getRecords()
    });
  },

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <b>Items</b>
          <Link className="btn pull-right" style={{padding:'0px'}} to="/cost-per-day/new">New Item</Link>
        </div>
        <ul className="panel-body list-group" style={this.listStyle}>
          {this.state.items.map((item) => <CostPerDayListItem item={item}/>)}
        </ul>
      </div>
    )
  }
});

export default CostPerDay;
