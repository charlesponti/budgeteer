'use strict';

var React = require('react');

var FormMixin = {

  /**
   * Construct field
   * @param  {string} type Type of form input
   * @param  {string} name Name of form input
   * @return {ReactElement}
   */
  makeField: function(type, name) {
    switch(type) {
      case 'hidden':
        return <input type='hidden' name={name}>;
      case 'input':
        return <input type='hidden' name={name} className="form-control">;
      case 'textarea':
        return <textarea className="form-control" name={name}></textarea>;
    }
  },

  /**
   * Construct fields
   * @return {ReactElement[]}
   */
  makeFields: function() {
    this.fields.map(function(field) {
      if (this.type instanceof String) {
        return this.makeField(field.type, field.name)  
      }
      if (this.type instanceof ReactComponent) {
        return field;
      }
    }.bind(this))
  },

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
