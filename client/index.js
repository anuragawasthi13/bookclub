import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import configureStore from "./store/configureStore";
import routesFunction from "./routes.js";
import {Router, browserHistory} from "react-router";


require("./index.css");

const store = configureStore();

const routes = routesFunction();
render(
  <Provider store={store}>
    <Router children={routes} history={browserHistory} />
  </Provider>,
  document.getElementById("react")
);