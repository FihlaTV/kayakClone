import React from 'react';
import { Route, NavLink, HashRouter } from 'react-router-dom';
import { Button } from 'reactstrap';
import Hotels from './Hotels';
import Flights from './Flights';
import Cars from './Cars';

class Header extends React.Component {
  render() {
    const divStyle = {
      textDecoration: 'none'
    };
    return (
      <HashRouter>
        <div className="title">
          <div className="headerList">
            <ul>
              <li>
                <NavLink to="/hotels">
                  <Button>
                    <img className="headerImage" src={'../../img/hotel.png'} />
                    <span className="name">Hotels</span>
                  </Button>
                </NavLink>
              </li>
              <li>
                <NavLink to="/flights">
                  <Button>
                    <img className="headerImage" src={'../../img/flight.png'} />
                    <span className="name">Flights</span>
                  </Button>
                </NavLink>
              </li>
              <li>
                <NavLink to="/cars">
                  <Button>
                    <img className="headerImage" src={'../../img/car.png'} />
                    <span className="name">Cars</span>
                  </Button>
                </NavLink>
              </li>
            </ul>

            <div className="content">
              <Route path="/hotels" component={Hotels} />
              <Route path="/flights" component={Flights} />
              <Route path="/cars" component={Cars} />
            </div>
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default Header;
