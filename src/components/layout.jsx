'use strict';

import React from 'react';

import Navbar from './navbar.jsx';

const LayoutComponent = React.createClass({
  componentDidMount: function() {
    this.props.getUserData();
    this.props.getGameData(this.props.dates.activeMonth)
  },
  render: function () {
    return (
      <div>
        <Navbar apiData={this.props.apiData} />
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