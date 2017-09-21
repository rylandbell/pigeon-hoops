'use strict';

import React from 'react';
// import moment from 'moment';

import Navbar from './navbar.jsx';

const LayoutComponent = React.createClass({
  componentDidMount: function() {
    //summer mode
    // const currentMonth = moment().format('YYYY-MM');
    // const currentMonth = '2017-04';
    this.props.getUserMonthData(this.props.reduxState.activeMonth);
    this.props.getStandingsData(this.props.reduxState.activeMonth);
    this.props.getUserData();
    this.props.getGameData(this.props.reduxState.activeMonth)
  },
  render: function () {
    return (
      <div>
        <Navbar />
        <div className="main">
          <div className="container container-body">
            <div className="row">
              <div className="col-xs-12">
                {this.props.children}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default LayoutComponent;