'use strict';

import React from 'react';

import SingleDayGameList from './single-day-game-list.jsx';
import DayPicker from './day-picker.jsx';

const DailyPicks = ({activeDate, gamesByDay, eligibleTeams, isSendingPrediction, predictedWinners, activeUserMonth, activeMonth, addPrediction, removePrediction, updateActiveDate}) => (
  <div className="panel panel-black daily-picks-panel">
    <div className="panel-body">
      <DayPicker activeDate={activeDate} activeMonth={activeMonth} updateActiveDate={updateActiveDate}/>
      <p className="text-center day-picker-message">
        (Home teams are displayed on the right.)
      </p>
      <SingleDayGameList gamesByDay={gamesByDay} eligibleTeams={eligibleTeams} isSendingPrediction={isSendingPrediction} predictedWinners={predictedWinners} activeDate={activeDate} activeUserMonth={activeUserMonth} addPrediction={addPrediction} removePrediction={removePrediction} />
    </div>
  </div>
);

export default DailyPicks;