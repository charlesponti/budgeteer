
const ItemActionButtons = React.createClass({

  propTypes: {
    edit: React.PropTypes.func.isRequired,
    remove: React.PropTypes.func.isRequired
  },

  render() {
    return (
      <span style={{margin: '0 5px'}}>
        <i style={this.props.iconStyle} className="glyphicon glyphicon-edit" onClick={this.props.edit}></i>
        <i style={this.props.iconStyle} className="glyphicon glyphicon-remove" onClick={this.props.remove}></i>
      </span>
    );
  }
});

export default ItemActionButtons;
