import SiteNavigation from '../SiteNavigation.js';

const App = React.createClass({

  propTypes: {
    children: React.PropTypes.array.isRequired
  },

  render() {
    return (
      <div>
        <SiteNavigation/>
        {this.props.children}
      </div>
    );
  }

});

export default App;
