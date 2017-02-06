import React from 'react';
import {Router, browserHistory, Route, IndexRoute} from 'react-router';

import AppRoot from './container/appRoot.js';
import Books from './container/Books.js';
import Mybooks from './container/mybooks.js';
import App from "./container/App.js";
import Login from "./container/Login.js";
import Signup from "./container/Signup.js";
import Settings from "./container/Settings.js";

const AppRouter = () => {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={AppRoot} />
        <Route path="login" component={Login} />
        <Route path="signup" component={Signup} />
        <Route path="books" component={Books} />
        <Route path="mybooks" component={Mybooks}/>
        <Route path = "setting" component = {Settings} />
      </Route>
    </Router>
  );
};

export default AppRouter;