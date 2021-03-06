'use strict';

var request = require('request');
var moment = require('moment-timezone');
var _ = require('lodash');

var apiOptions = {
  server: 'http://localhost:3000'
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = 'https://frozen-retreat-57000.herokuapp.com';
}

// generate error page in browser:
var _showError = function (req, res, apiResponse, err, body) {
  var title;
  var content;
  var message;

  if (apiResponse) {
    switch (apiResponse.statusCode){
      case 401:
        if (req.cookies && req.cookies.user) {

          //For logged-in user attempting to access unauthorized endpoints
          title = '401, Authorization Error';
          content = 'You are not authorized to access that page.';
        } else {

          //If user isn't logged in at all, load login page instead of error page
          res.redirect('/login');
        }

        break;
      case 404:
        title = '404, content not found';
        content = 'Sorry, we can\'t find your page. Maybe try again?';
        break;
      case 422:
        title = '422 Error';
        content = body.text;
        break;
      default:
        title = apiResponse.statusCode + ' error';
        if (apiResponse.body && apiResponse.body.errors) {
          content = 'Something\'s gone wrong with this request: \n\n' + apiResponse.body.errors[0].message;
        } else {
          content = 'Something\'s gone wrong with this request.';
        }
    }
  } else {
    if (err.code === 'ECONNREFUSED') {
      title = '503, Service Unavailable';
      content = 'Could not connect to the server. Please try again later.';
    } else {
      title = '500, Internal Service Error';
      content = 'Something\'s gone wrong with this request. Try again later.';
    }
  }

  res.render('generic-text', {
    message: message,
    title: title,
    content: content,
    pageId: 'generic-text',
    nonce: req.nonce
  });
};

/* GET React app */
module.exports.reactApp = function (req, res, next) {
  res.render('react-app', {
    title: 'Pigeon Hoops',
    month: req.params.month,
    loggedIn: true,
    error: req.query.err,
    pageId: 'react-app',
    nonce: req.nonce
  });
};

// GET login page
var renderLoginView = function (req, res, body) {
  var message;
  if (body && body.message) {
    message = body.message;
  }

  res
    .clearCookie('token')
    .render('login', {
      title: 'Pigeon Hoops | Login Page',
      loggedIn: false,
      message: message,
      pageId: 'login-page',
      nonce: req.nonce
    });
};

module.exports.login = function (req, res, next) {
  renderLoginView(req, res);
};

// POST credentials from login page
module.exports.submitCredentials = function (req, res, next) {
  var path = '/api/login';
  var requestOptions = {
    url: apiOptions.server + path,
    method: 'POST',
    json: req.body,
    qs: {}
  };
  request(requestOptions, function (err, apiResponse, body) {
    var cookieOptions = {};
    cookieOptions.maxAge = 1000 * 3600 * 24 * 7;
    if (apiResponse.statusCode === 200) {
      res.cookie('token', apiResponse.body.token, cookieOptions);
      res.redirect('/');
    } else if (apiResponse.statusCode === 400 || apiResponse.statusCode === 401) {
      renderLoginView(req, res, apiResponse.body);
    } else {
      _showError(req, res, apiResponse);
    }
  });
};

module.exports.registerNew = function (req, res, next) {
  var path = '/api/register';
  var requestOptions = {
    url: apiOptions.server + path,
    method: 'POST',
    json: req.body,
    qs: {}
  };
  request(requestOptions, function (err, apiResponse, body) {
    var cookieOptions = {};
    cookieOptions.maxAge = 1000 * 3600 * 24;
    if (apiResponse.statusCode === 200) {
      res.cookie('token', apiResponse.body.token, cookieOptions);
      res.redirect('/leagues');
    } else if (apiResponse.statusCode === 400 || apiResponse.statusCode === 401) {
      var flashMessage = body.message || 'An error occurred in the registration process. Please try again.';
      req.session.flash = {
        message: flashMessage
      };
      return res.redirect('/login');
    } else {
      _showError(req, res, apiResponse);
    }
  });
};
