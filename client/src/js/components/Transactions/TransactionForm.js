import React from 'react';
import { History } from 'react-router';
import TransactionStore from './TransactionStore';

export default class TransactionForm extends React.Component {

  static mixins = [History];

  constructor(props) {
    super(props);

    // Set initial state
    this.state = {
      transaction: this.props.location.state || {}
    };
  }

  onSubmit(event) {
    event.preventDefault();
    TransactionStore.add({
      description: event.target.description.value,
      amount: event.target.amount.value,
      category: event.target.category.value
    }).then(() => {
      this.history.pushState(null, '/transactions');
    });
  }

  render() {
    const transaction = this.state.transaction;

    return (
      <div className="panel panel-default" style={{maxWidth: '600px', margin: '0 auto'}}>
        <div className="panel-heading">
          <h4>New Transaction</h4>
        </div>
        <div className="panel-body">
          <form onSubmit={this.onSubmit} className="form-horizontal">
            <div className="form-group">
              <label htmlFor="description" className="col-sm-2 control-label">Description</label>
              <div className="col-sm-10">
                <input
                  className="form-control"
                  type="text"
                  ref="description"
                  name="description"
                  value={transaction.description}
                  onChange={this._onFormFieldChange}/>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="amount" className="col-sm-2 control-label">Amount</label>
              <div className="col-sm-10">
                <input
                  className="form-control"
                  ref="amount"
                  name="amount"
                  value={transaction.amount}
                  onChange={this._onFormFieldChange}/>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="category" className="col-sm-2 control-label">Category</label>
              <div className="col-sm-10">
                <select className="form-control" ref="category" name="category">
                  <option value="food"> Food </option>
                </select>
              </div>
            </div>
            <div className="form-group text-center">
              <button className="btn btn-success">Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
