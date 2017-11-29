import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { browserHistory } from 'react-router';
import { IndexRoute } from 'react-router';
import Headbar from './Headbar';
import Header from './Header';
import Flights from './Flights';
import Home from './Home';
class Temp extends React.Component {
  constructor() {
    super();
    this.state = {
      currentPath: '/'
    };
  }
  render() {
    return (
      <Router history={browserHistory}>
        <div className="wrap">
          <Route path="/" component={Home}>
            <IndexRoute path="/flights" component={Home} />
          </Route>
        </div>
      </Router>
    );
  }
}

export default Temp;
