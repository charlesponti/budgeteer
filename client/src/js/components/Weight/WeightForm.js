const History = ReactRouter.History;
import WeightStore from './WeightStore';

var WeightForm = React.createClass({

  mixins: [History],

  getInitialState: function getInitialWeightFormState() {
    return {
      weight: this.props.location.state || {}
    };
  },

  getWeightValues: function getWeightValues(weight) {
    const diff = 2.2046;

    switch (this.refs.measurement.value) {
      case 'lbs':
        return {
          kgs: weight / diff,
          lbs: weight
        };
      default:
        return {
          kgs: weight,
          lbs: weight * diff
        };
    }
  },

  onSubmit: function onWeightFormSubmit(e) {
    // Prevent default action
    e.preventDefault();

    // Dispatch event to create weight
    WeightStore
      .add(this.generateWeightRecord())
      .then(() => {
        return this.history.pushState(null, '/weight');
      });
  },

  generateWeightRecord: function generateWeightRecord() {
    const weight = this.getWeightValues(this.refs.weight.value);

    return {
      id: this.state.weight.id,
      kgs: weight.kgs,
      lbs: weight.lbs,
      created: this.refs.date.value
    };
  },

  onWeightChange: function onWeightChange() {
    return this.setState({
      weight: this.generateWeightRecord()
    });
  },

  /**
   * Render component
   */
  render: function onWeightFormRender() {
    let date = this.state.weight && this.state.weight.created;

    if (date) {
      date = window.moment(date).format('YYYY-MM-DD');
    } else {
      date = window.moment().format('YYYY-MM-DD');
    }

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <b> New Weight </b>
        </div>
        <div className="panel-body">
          <form role="form" onSubmit={this.onSubmit}>
            <div className="form-group">
              <label htmlFor="weight"> Weight </label>
              <input className="form-control" name="weight"
                     placeholder="Weight"
                     ref="weight"
                     value={this.state.weight.kgs}
                     onChange={this.onWeightChange}
                     required/>
            </div>
            <div className="form-group">
              <label htmlFor="measurement"> Measurement </label>
              <select className="form-control" name="measurement" ref="measurement" required>
                <option value="kgs"> Kilograms </option>
                <option value="lbs"> Pounds </option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="date"> Date </label>
              <input className="form-control" type="date" name="date"
                     ref="date"
                     value={date}
                     onChange={this.onWeightChange}
                     required/>
            </div>
            <br/>
            <button className="btn btn-default pull-right"> Add Weight </button>
          </form>
        </div>
      </div>
    );
  }

});

module.exports = WeightForm;
