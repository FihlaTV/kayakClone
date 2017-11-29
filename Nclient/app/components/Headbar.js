import React from 'react';
import Hotels from './Hotels';
import { Route, NavLink, HashRouter } from 'react-router-dom';
class Headbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slidingActive: false
    };
  }
  render() {
    return (
      <div className="headbar">
        <img className="kayakLogo" src={'../../img/kayak.jpg'} />
        <nav>
          <ul>
            <li className="item">
              <a>Hotels</a>
            </li>
            <li className="item">
              <a>Flights</a>
            </li>
            <li className="item">
              <a>Cars</a>
            </li>
          </ul>
        </nav>

        <div className="headBarContent" />
        <a className="headbarAccount">
          <span>
            <img className="myAccount" src={'../../img/account.png'} />
            <div className="headbarFont"> My account </div>
          </span>
        </a>
      </div>
    );
  }
}

export default Headbar;
