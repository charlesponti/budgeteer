const Link = ReactRouter.Link;
import Transaction from './TransactionListItem';
import TransactionForm from './TransactionForm.js';
import TransactionStore from './TransactionStore.js';

class Transactions extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      transactions: TransactionStore.getRecords()
    };
  }

  componentWillMount() {
    TransactionStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount() {
    TransactionStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    return this.setState({transactions: TransactionStore.getRecords()});
  }

  render() {
    let transactions = this.state.transactions;

    let buttonStyle = {
      padding: '0px'
    };

    if (transactions.length) {
      transactions = transactions.map(function(transaction) {
        return (<Transaction transaction={transaction} key={transaction.id}/>);
      });
    }
    else {
      transactions = <Transaction/>
    }

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          Transactions
          <Link className="btn pull-right" style={buttonStyle} to="/transactions/new">New Transaction</Link>
        </div>
        <ul className="panel-body list-group">
          {transactions}
        </ul>
      </div>
    );
  }
}

export default Transactions;
