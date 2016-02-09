import React from 'react';
import BaseComponent from './BaseComponent';

export default class DateRangeField extends BaseComponent {
  constructor(props) {
    super(props);
    this.propTypes = {
      name: React.PropTypes.string.isRequired
    };
  }

  componentDidMount() {

  }

  render() {
    return (
      <input type="text" name={this.props.name}/>
    );
  }
}
