import React from 'react';
import { Link } from 'react-router';
import Transaction from './TransactionListItem';
import TransactionForm from './TransactionForm.js';
import TransactionStore from './TransactionStore.js';

export default class TransactionsList extends React.Component {
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
      transactions = transactions.map((transaction) => {
        return (<Transaction transaction={transaction} key={transaction.id}/>);
      });
    }
    else {
      transactions = <Transaction/>;
    }

    return (
      <div className="card blue-grey darken-1">
        <div className="panel-heading">
          Transactions
          <Link className="btn pull-right" style={buttonStyle} to="/transactions/new">New Transaction</Link>
        </div>
        <ul className="collection">
          {transactions}
        </ul>
      </div>
    );
  }
}