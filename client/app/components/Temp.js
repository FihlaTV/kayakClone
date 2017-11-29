import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class Temp extends React.Component {
  constructor() {
    super();
    this.state = {
      currentPath: '/'
    };
  }
  render() {
    const wrapCls =
      this.state.currentPath === '/ticket' ? 'wrap headerCollapsed' : 'wrap';
    return (
      <div className={wrapCls}>
        <div className="header">
          <div className="bg" />
        </div>
      </div>
    );
  }
}

export default Temp;
