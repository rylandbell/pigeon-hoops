'use strict';

import React from 'react';
import moment from 'moment';

import StatusMessage from '../status-message.jsx';
import JoinMonth from './join-month.jsx';
import UpcomingPicks from './upcoming-picks.jsx';
import PicksSummaryMonthSelector from './picks-summary-month-selector.jsx';

const PicksSummary = React.createClass({
  render: function() {
    let panelContent, panelTitle;
    if (this.props.missingUserMonth) {
      panelContent = <JoinMonth selectedPicksMonth={this.props.selectedPicksMonth} createNewUserMonth={this.props.createNewUserMonth} getStandingsData={this.props.getStandingsData} getUserMonthData={this.props.getUserMonthData} />;
      panelTitle = `Join ${moment(this.props.selectedPicksMonth).format('MMMM')} Competition`;
    } else if (this.props.userMonth && this.props.userMonth.userMonthId) {
      panelContent = <UpcomingPicks selectedPicksMonth={this.props.selectedPicksMonth} userMonth={this.props.userMonth} />
      panelTitle = `My Upcoming Picks`;
    } else {
      panelContent = <StatusMessage messageBold={'Loading user picks data...'} messageBody={'Just hang tight.'} messageClass={'info'}/>;
      panelTitle = "Loading";
    }
    return (
      <div className="panel panel-default panel-black">
        <div className="panel-heading">
          <div className="panel-title">{panelTitle}</div>
        </div>
        <div className="panel-body">
          {panelContent}
        </div>
        <hr />
        <PicksSummaryMonthSelector selectedPicksMonth={this.props.selectedPicksMonth} setPicksMonth={this.props.setPicksMonth} getUserMonthData={this.props.getUserMonthData}/>
      </div>
    );
  }
});

export default PicksSummary;