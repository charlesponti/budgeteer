'use strict';

var React = require('react');

var FormMixin = {

  /**
   * Make form-group
   * @param  {string} name  Name of input field
   * @param  {string} label Text for label element
   * @param  {function} changeFn Function to handle change event
   */
  makeFormGroup: function(name, label, changeFn) {
    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input className="form-control" 
               name={name} 
               onChange={changeFn}
               value={this.state.record[name]}/>
      </div>
    )
  }

};

module.exports = FormMixin;
