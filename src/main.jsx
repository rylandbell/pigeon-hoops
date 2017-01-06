'use strict';

//babel-polyfill will polyfill ES6 features, specifically Promises for fetch
// import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as Redux from 'redux';
import browserHistory from 'react-router/lib/browserHistory';
import Router from 'react-router/lib/Router';
import Alert from 'react-s-alert';

import Reducers from './reducers/reducers.js';
import ActionCreator from './action-creators.js';
import Routes from './routes.jsx';

const store = Redux.createStore(Reducers.app);

function render() {
  ReactDOM.render(
    <Provider store={store}>
      <div>
        <Router history={browserHistory}>
          {Routes}
        </Router>
        <Alert />
      </div>
    </Provider>,
    document.getElementById('app-root')
  );
}

//don't actually run anything on login page:
if (window.location.pathname !== "/login") {
  
  //pass date data from path to Redux store if current path looks like /picks/2016/:month/:day
  const dateToRedux = function () {
    let pathArray = window.location.pathname.split('/');
    if (pathArray[1] === 'picks') {
      store.dispatch(ActionCreator.setActiveDate(pathArray[2],pathArray[3]));
    }
  }

  //call dateToRedux on initial load, and again whenever the browserHistory updates
  dateToRedux();
  browserHistory.listen(dateToRedux);

  store.subscribe(render);
  render();
}

//~~~~~~Bootstrap/jQuery~~~~~~~~

//Hide nav menu once an item is selected
$(document).on('click','.navbar-collapse.in',function(e) {
  if( $(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle' ) {
    $(this).collapse('hide');
  }
});
