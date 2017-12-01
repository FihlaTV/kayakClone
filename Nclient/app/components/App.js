import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { browserHistory } from 'react-router';
import { IndexRoute } from 'react-router';
import Headbar from './Headbar';
import Header from './Header';
import FlightList from './FlightList';
import Home from './Home';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentPath: '/'
    };
  }
  render() {
    return (
      <Router history={browserHistory}>
        <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/flight" component={FlightList} />
        </div>
      </Router>
    );
  }
}

export default App;
