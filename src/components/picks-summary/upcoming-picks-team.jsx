'use strict';

import React from 'react';
import { browserHistory } from 'react-router';
import moment from 'moment';

const getPick = (userMonth, day) => {
  if (userMonth.predictedWinners[day] && userMonth.predictedWinners[day].teamName) {
    return userMonth.predictedWinners[day].teamName.toLowerCase();
  } else {
    return "glyphicon glyphicon-minus"
  }
};

const UpcomingPicksTeam = React.createClass({
  handleClick: function () {
    const currentMonth = moment().format('YYYY-MM');
    const pickDay = this.props.day;
    const path = `/picks/${currentMonth}/${pickDay}`;
    browserHistory.push(path);
  },
  render: function() {
    return (
      <td className="upcoming-picks-team" onClick={this.handleClick}>
        <div className={"center-block text-center "+getPick(this.props.userMonth,this.props.day)}></div>
      </td>
    );
  }
});



export default UpcomingPicksTeam;