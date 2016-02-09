import React from 'react';
import SiteNavigation from '../SiteNavigation.js';

export default class App extends React.Component {
  static propTypes = {
    //children: React.PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <SiteNavigation/>
        {this.props.children}
      </div>
    );
  }
}
