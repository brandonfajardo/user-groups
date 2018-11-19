import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";

import reducers from "./reducers";
import { Router, Route, Switch } from "react-router-dom";
import { NavBar } from "./components";
import { Users, UsersNew, Groups, GroupNew } from "./pages";
import thunk from "redux-thunk";

import history from "./history";
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Fragment>
      <Router history={history}>
        <div>
          <NavBar />
          <div style={{ padding: "20px" }}>
            <Switch>
              <Route exact path="/users" component={Users} />
              <Route exact path="/users/new" component={UsersNew} />
              <Route exact path="/groups/new" component={GroupNew} />
              <Route exact path="*" component={Groups} />
            </Switch>
          </div>
        </div>
      </Router>
    </Fragment>
  </Provider>,
  document.querySelector(".container")
);
