import React from 'react';
import Hotels from './Hotels';
import Header from './Header';
import Headbar from './Headbar';
import { Route, NavLink, HashRouter } from 'react-router-dom';
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slidingActive: false
    };
  }
  render() {
    return (
      <div className="header">
        <div className="bg" />
        <Headbar />
        <Header />
      </div>
    );
  }
}

export default Home;
