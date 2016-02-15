import { Transaction } from './TransactionStore';
import TransactionListItem from './TransactionListItem';
import React from 'react';

describe('TransactionList', () => {
  var TestUtils;

  beforeEach(function() {
    TestUtils = React.addons.TestUtils;
  });

  it('should display transaction', function() {
    var transaction = new Transaction({
      description: 'foo',
      amount: 5,
      category: 'food'
    });
    var element = TestUtils.renderIntoDocument(<TransactionListItem transaction={transaction}/>);
    expect(element.props.transaction).toEqual(transaction);
  });

});
