import React from 'react';
import { Link } from 'react-router';
import firebaseUtils from './utils/firebase';

export default class SiteNavigation extends React.Component {

  render() {
    const buttons = (
      <span>
        <li>
          <Link to="/transactions">Transactions</Link>
        </li>
        <li>
          <Link to="/cost-per-day">Cost Per Day</Link>
        </li>
        <li>
          <Link to="/weight">Weight</Link>
        </li>
      </span>
    );

    return (
      <nav>
        <div className="nav-wrapper">
          <a href="#" className="brand-logo">Backpack</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {firebaseUtils.isLoggedIn() ? buttons : <span></span>}
          </ul>
        </div>

      </nav>
    );
  }
}
