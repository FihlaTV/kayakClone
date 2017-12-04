import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import Home from './components/Home';
import store from './reducers/index';
import Analysis from './components/Analysis';
import Users from './components/Users';
import Hotels from './components/Hotels';
import Tripdetails from './components/tripdetails';
import Dashboard from './components/Dashboard';
import Flights from './components/Flights';
import Cars from './components/Cars';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import { Router, Route, browserHistory ,hashHistory} from 'react-router';
import {BrowserRouter,Switch} from 'react-router-dom';
import setAuthorizationToken from "./utils/setAuthorizationToken";

import jwt from 'jsonwebtoken';
//const history = createBrowserHistory()

//ReactDOM.render(<App />, document.getElementById('root'));
const Routes = () => (
  <div>
  <Switch>

    <Route path="/Home" component={Home}></Route>
    <Route path="/Analysis" component={Analysis}></Route>
    <Route path="/Users" component={Users}></Route>
    <Route path="/Tripdetails" component={Tripdetails}></Route>
    <Route path="/Hotels" component={Hotels}></Route>
    <Route path="/Dashboard" component={Dashboard}></Route>
    <Route path="/Flights" component={Flights}/>
      <Route path="/Cars" component={Cars}/>

      <Route path="/" component={App}></Route>
</Switch>
  </div>
)


ReactDOM.render(
    <Provider store={store}>
    <BrowserRouter>    
    	<Routes/>    
    </BrowserRouter>
    </Provider>
    ,
    document.getElementById('root')
);
registerServiceWorker();
