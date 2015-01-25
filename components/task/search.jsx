'use strict';

var React = require('react');
var TaskStore = require('../../client/stores/tasks');

var TaskSearch = React.createClass({

  /**
   * Filter tasks by search term
   * @param  {SyntheticEvent} e
   * @param  {string} id
   */
  onChange: function(e) {
    var isTerm, completedTerm, categoryTerm, category;
    var searchTerm = e.target.value;
    var completedRegex = /is:\w+\s/;
    var categoryRegex = /category:\w+\s/;
    // Clone tasks
    var records = TaskStore.models.slice(0);

    if (completedRegex.test(searchTerm)) {
      isTerm = completedRegex.exec(searchTerm)[0];
      completedTerm = isTerm.trim().replace('is:','');
      records = records.filter(function(task) {
        switch(completedTerm) {
        case 'done':
          return task.completed === true;
        case 'notdone':
          return task.completed === false;
        }
      });
      searchTerm = searchTerm.replace(isTerm, '');
    }

    if (categoryRegex.test(searchTerm)) {
      category = categoryRegex.exec(searchTerm)[0];
      categoryTerm = category.trim().replace('category:','');
      var categoryTermRegex = new RegExp(categoryTerm, 'i');
      records = records.filter(function(task) {
        return categoryTermRegex.test(task.get('category').name);
      });
      searchTerm = searchTerm.replace(category, '');
    }

    if (searchTerm.length) {
      searchTerm = searchTerm.replace(' ', '');
      var regExp = new RegExp(searchTerm, 'i');
      records = records.filter(function(task) {
        return regExp.test(task.get('title'));
      });
    }

    this.props.callback(records);
  },

  render: function() {
    return (
      <form role="form" className={this.props.className || ""}>
        <input type="text" 
               className="form-control"
               onChange={this.onChange}
               placeholder="Search" />
      </form>
    );
  }

});

module.exports = TaskSearch;
