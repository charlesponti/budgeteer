'use strict';

var TaskForm = React.createClass({

  /**
   * Handle form submission
   * @param  {SyntheticEvent} e Event object
   * @param  {String} id Id of form
   */
  handleSubmit: function(e, id) {
    var form = this.getDOMNode();
    App.API.post('/api/tasks', {
      title: form.title.value,
      description: form.description.value
    }).end(function(err, response) {
      err = err || response.error;
      if (err) {
        return console.log(err);
      }
      console.log(response.body);
    });
  },

  /**
   * Render component
   */
  render: function() {
    return (
      <form onSubmit={this.handleSubmit} role="form">
        <div className="form-group">
          <label htmlFor="title"> Title </label>
          <input className="form-control" name="title" />
        </div>
        <div className="form-group">
          <label htmlFor="title"> Description </label>
          <input className="form-control" name="description" />
        </div>
        <button className="btn btn-success">Create Task</button>
      </form>
    )
  }

});

module.exports = TaskForm;
