const History = ReactRouter.History;
import TransactionStore from './TransactionStore.js';
import ItemActionButtons from '../../ItemActionButtons.js';

export var TransactionListItem = React.createClass({

  mixins: [History],

  componentWillMount() {
    this.styles = {
      transactionAmount: {
        padding: '0px 5px'
      },
      icon: {
        padding: '0px 5px'
      }
    }
  },

  onEditClick() {
    this.history.pushState(this.props.transaction, '/transactions/new');
  },

  onRemoveClick() {
    var answer = window.confirm('Are you sure you want to delete this' +
      ' transaction?');

    if (answer) {
      TransactionStore.remove(this.props.transaction);
    }
  },

  render() {
    let transaction = this.props.transaction;

    if (!transaction) {
      return (<li className="list-group-item">No Transactions</li>);
    }

    return (
      <li className="list-group-item transaction">
        <span className="desc">{transaction.description}</span>
        <span className="pull-right">
          <span className="amount" style={this.styles.transactionAmount}>
            {transaction.amountToString()}
          </span>
          <ItemActionButtons iconStyle={this.styles.icon}
                             edit={this.onEditClick}
                             remove={this.onRemoveClick}/>
        </span>
      </li>
    );
  }

});

export default TransactionListItem;
