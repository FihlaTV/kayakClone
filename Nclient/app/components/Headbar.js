import React from 'react';
import Hotels from './Hotels';
import { Route, NavLink, HashRouter } from 'react-router-dom';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

import { Link } from 'react-router-dom';

class Headbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false
    };
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
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
