import { Transaction } from './TransactionStore';
import TransactionList from './TransactionsList';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

describe('TransactionList', () => {

  const transactions = [
    new Transaction({ description: 'foo', amount: 5, category: 'food', id: 0 }),
    new Transaction({ description: 'bar', amount: 6, category: 'food', id: 1 })
  ];

  it('should show "No Transactions" if empty transactions', () => {
    const list = TestUtils.renderIntoDocument(<TransactionList transactions={[]}/>);
    const listItems = TestUtils.scryRenderedDOMComponentsWithTag(list, 'li');
    expect(list.props.transactions.length).toEqual(0);
    expect(listItems.length).toEqual(3);
    expect(listItems[1].getDOMNode().textContent).toEqual('No Transactions');
  });

  it('should display transactions', function() {
    var list = TestUtils.renderIntoDocument(<TransactionList transactions={transactions}/>);
    var listItems = TestUtils.scryRenderedDOMComponentsWithTag(list, 'li');
    var description = TestUtils.scryRenderedDOMComponentsWithClass(list, 'desc');
    var amounts = TestUtils.scryRenderedDOMComponentsWithClass(list, 'amount');
    expect(list.props.transactions.length).toEqual(2);
    expect(listItems.length).toEqual(4);
    expect(description[0].getDOMNode().textContent).toEqual('foo');
    expect(description[1].getDOMNode().textContent).toEqual('bar');
    expect(amounts[0].getDOMNode().textContent).toEqual('$5');
    expect(amounts[1].getDOMNode().textContent).toEqual('$6');
  });

});
