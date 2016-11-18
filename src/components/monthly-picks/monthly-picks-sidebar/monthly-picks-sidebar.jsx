'use strict';

import React from 'react';

import MonthlyPicksSidebarRow from './monthly-picks-sidebar-row.jsx';

const MonthlyPicksSummary = ({predictedWinners, activeDate, activeMonth, goToDate}) => {
  const daysInMonth = moment(activeMonth).daysInMonth();
  
  const rows = [];
  for (var i = 1; i<=daysInMonth; i++){
    rows.push(
      <MonthlyPicksSidebarRow userPrediction={predictedWinners[i]} activeDate={activeDate} activeMonth={activeMonth} goToDate={goToDate} dayOfMonth={i} key={i}/>
    )
  }

  return  (
    <div className="col-xs-12 col-sm-3 col-md-2 col-sm-offset-1 col-md-offset-1">
      <div className="text-center lead">
        Predictions Summary
      </div>
      <table className="table table-condensed table-hover monthly-picks-sidebar">
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  );
}

export default MonthlyPicksSummary;

// {eligibleTeams.map((team, index) => <MonthlyPicksSidebarRow predictedWinners={predictedWinners} date={index} key={index}/>)}