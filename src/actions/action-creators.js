'use strict';

const api = {

  //GET list of months for standings month-selector
  requestMonthListWaiting: () => (
    {
      type: 'REQUEST_MONTH_LIST_PENDING'
    }
  ),

  receiveMonthList: (list) => (
    { 
      type: 'RECEIVE_MONTH_LIST',
      list: list
    }
  ),

  requestMonthList: () => (
    {
      type: 'REQUEST_MONTH_LIST_FAILURE'
    }
  ),

  //PUT send game prediction:
  sendPredictionWaiting: () => (
    {
      type: 'SEND_PREDICTION_PENDING'
    }
  ),

  sendPredictionSuccess: (response) => (
    {
      response: response,
      type: 'SEND_PREDICTION_SUCCESS'
    }
  ),

  sendPredictionFailure: () => (
    {
      type: 'SEND_PREDICTION_FAILURE'
    }
  ),

  //POST create new userMonth at user request:
  createUserMonthWaiting: () => (
    {
      type: 'CREATE_USER_MONTH_PENDING'
    }
  ),

  createUserMonthSuccess: (month) => (
    { 
      type: 'CREATE_USER_MONTH_SUCCESS',
      month: month
    }
  ),

  createUserMonthFailure: (message) => (
    {
      type: 'CREATE_USER_MONTH_FAILURE',
      message: message
    }
  ),

  //POST create join league request:
  joinLeagueWaiting: () => (
    {
      type: 'JOIN_LEAGUE_PENDING'
    }
  ),

  joinLeagueSuccess: (month) => (
    { 
      type: 'JOIN_LEAGUE_SUCCESS',
      month: month
    }
  ),

  joinLeagueFailure: (message) => (
    {
      type: 'JOIN_LEAGUE_FAILURE',
      message: message
    }
  ),

  //User actions:
  addPrediction: (gameId, teamName, gameDate) => (
    {
      type: 'ADD_PREDICTION',
      teamName: teamName,
      gameDate: gameDate
    }    
  ),
  removePrediction: (gameId, gameDate) => (
    {
      type: 'REMOVE_PREDICTION',
      gameDate: gameDate
    }
  ),
  markIneligible: (teamName) => (
    {
      type: 'MARK_INELIGIBLE',
      teamName: teamName
    }
  ),
  markEligible: (teamName) => (
    {
      type: 'MARK_ELIGIBLE',
      teamName: teamName
    }
  ),
  setActiveDate: (month, day) => (
    {
      type: 'SET_ACTIVE_DATE',
      month: month,
      day: day
    }
  ),
  setActiveMonth: (month) => (
    {
      type: 'SET_ACTIVE_MONTH',
      month: month,
    }
  ),
  leagueNameEntry: (text) => (
    {
      type: 'LEAGE_NAME_ENTRY',
      payload: text
    }    
  ),
  leagueIdEntry: (text) => (
    {
      type: 'LEAGUE_ID_ENTRY',
      payload: text
    }    
  ),
  //~~~~~~~CHAT~~~~~~~~
  chatTextEntry: (text) => (
    {
      type: 'CHAT_TEXT_ENTRY',
      enteredChatText: text
    }    
  ),
  sendMessage: (newMessageObject) => (
    {
      type: 'SEND_MESSAGE',
      newMessage: newMessageObject
    }
  )
};

export default api;