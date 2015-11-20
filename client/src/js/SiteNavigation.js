let Link = ReactRouter.Link;
const auth = require('./app/auth');

class SiteNavigation extends React.Component {

  render() {
    const buttons = (
      <div className="collapse navbar-collapse" id="navbar">
        <ul className="nav navbar-nav">
          <li>
            <Link to="/transactions">Transactions</Link>
          </li>
          <li>
            <Link to="/cost-per-day">Cost Per Day</Link>
          </li>
          <li>
            <Link to="/weight">Weight</Link>
          </li>
        </ul>
      </div>
    );

    return (
      <nav className="navbar navbar-light">
        <div className="container-fluid">
          <!-- Brand and toggle get grouped for better mobile display -->
          <div className="navbar-header">
            <button type="button"
                    className="navbar-toggle collapsed"
                    data-toggle="collapse"
                    data-target="#navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">Backpack</a>
          </div>
          {auth.loggedIn() ? buttons : <span></span>}
        </div><!-- /.container-fluid -->
      </nav>
    );
  }
}

export default SiteNavigation;
