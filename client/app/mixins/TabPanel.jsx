'use strict';

// Module dependencies
var React = require('react');

var TabPanel = {

  propTypes: {
    // Require tabs configuration
    tabs: React.PropTypes.object.isRequired
  },

  /**
   * Get initial state of tab panel
   * @return {object}
   */
  getInitialState: function() {
    var defaultTab = this.props.default;
    return { component: defaultTab ? this.props.tabs[defaultTab] : '' };
  },

  /**
   * Handle click event of tab
   * @param  {SyntheticEvent} e
   * @param  {string} id
   */
  onClick: function(e, id) {
    var tab = e.target.dataset.tab;
    this.setState({ component: this.props.tabs[tab] });
  },

  /**
   * Contruct tab elements
   * @return {ReactElement[]}
   */
  constructTabs: function() {
    return Object.keys(this.props.tabs).map(function(title) {
      return (
        <li onClick={this.onClick} role="presentation">
          <a data-tab={title}>{title}</a>
        </li>
      );
    }.bind(this));
  },

  /**
   * Render component
   * @return {ReactElement}
   */
  render: function() {
    return (
      <div className={this.props.className}>
        <ul className="nav nav-pills" role="tablist" ref="tabpanelNav">
          {this.constructTabs()}
        </ul>
        <div ref="tabpanelBody">
          {this.state.component}
        </div>
      </div>
    )
  }

};

module.exports = TabPanel;
