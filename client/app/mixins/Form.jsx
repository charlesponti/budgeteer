'use strict';

var React = require('react');

var FormMixin = {

  /**
   * Construct field
   * @param  {string} type Type of form input
   * @param  {string} name Name of form input
   * @return {ReactElement}
   */
  makeField: function(type, name, changeFn) {
    var el;

    switch (type) {
      case 'hidden':
        el = React.DOM.input({ type: 'hidden' });
        break;
      case 'input':
        el = React.DOM.input({ type: 'text' });
        break;
      case 'textarea':
        el = React.DOM.textarea();
        break;
    }
    
    el.props.value = this.state.record[name];
    el.props.className = "form-control";
    el.props.onChange = changeFn;
    el.props.name = name;

    return el;
  },

  /**
   * Construct fields
   * @return {ReactElement[]}
   */
  makeFields: function() {
    this.fields.map(function(field) {
      
      if (this.type instanceof String) {
        return this.makeField(field.type, field.name);
      }
      
      if (this.type instanceof ReactComponent) {
        return field;
      }

    }.bind(this));
  },

  /**
   * Make form-group
   * @param {object} config Configuration for form group
   * @param  {string} name  Name of input field
   * @param  {string} name  Name of input field
   * @param  {string} label Text for label element
   * @param  {function} changeFn Function to handle change event
   */
  makeFormGroup: function(config) {
    return (
      <div className="form-group">
        <label htmlFor={config.name}>{config.label}</label>
        {this.makeField(config.type, config.name, config.changeFn)}
      </div>
    )
  }

};

module.exports = FormMixin;
