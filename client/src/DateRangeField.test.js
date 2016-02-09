import React from 'react';
import DateRangeField from './DateRangeField';
import TestUtils from 'react-addons-test-utils';

describe('DateRangeField', () => {
  it('should render', () => {
    const component = TestUtils.renderIntoDocument(<DateRangeField/>);
    expect(component).toBeDefined();
  });
});
