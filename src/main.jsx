'use strict';

//babel-polyfill will polyfill ES6 features, specifically Promises for fetch
import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as Redux from 'redux';
import { Router, Route, browserHistory } from 'react-router'
import Alert from 'react-s-alert';

import Reducers from './reducers.js';
import Helper from './helper.js';
import ActionCreator from './action-creators.js';
import MonthlyPicksContainer from './components/containers/monthly-picks-container.jsx';
import DailyPicksContainer from './components/containers/daily-picks-container.jsx';

const store = Redux.createStore(Reducers.app);
store.subscribe(render);

//extract date data from URL, pass to Redux store (dateArray has format ['2016-11','9'])
const dateToRedux = function () {
  let dateArray = Helper.parseDateFromPath(window.location.pathname);
  store.dispatch(ActionCreator.setActiveDate(dateArray[0],dateArray[1]));
}

//call dateToRedux on initial load, and again whenever the browserHistory updates
dateToRedux();
browserHistory.listen(dateToRedux);

function render() {
  ReactDOM.render(
    <Provider store={store}>
      <div>
        <Router history={browserHistory}>
          <Route path="/app/picks/" component={MonthlyPicksContainer}>
            <Route path="/app/picks/:month/:day" component = {DailyPicksContainer} />
          </Route>
        </Router>
        <Alert />
      </div>
    </Provider>,
    document.getElementById('app-root')
  );
}

render();