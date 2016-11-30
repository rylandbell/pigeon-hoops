'use strict';

import { connect } from 'react-redux';
import Alert from 'react-s-alert';
import moment from 'moment';
import _ from 'lodash';

import ActionCreator from '../../action-creators.js';
import Helper from '../../helper.js';
import StandingsTable from '../standings/standings-table.jsx';

const mapStateToProps = state => ({
  monthList: state.monthList,
  standingsData: state.standingsData,
  isFetchingStandingsData: state.isFetchingStandingsData
});

const mapDispatchToProps = dispatch => ({
  getStandingsData:
    (month) => {
      Helper.myFetch(
        '/api/userMonth/all-public/'+month,
        'GET',
        {},
        (response => {
          dispatch(ActionCreator.receiveStandingsData(response));
        }),
        (response => {
          dispatch(ActionCreator.requestStandingsDataFailure());
          Alert.warning('Error: Failed to load standings data. ' + response.message,
            {
              position: 'bottom',
              effect: 'stackslide',
              beep: false,
              timeout: 8000,
              offset: 0
            }
          );
        })
      );
      dispatch(ActionCreator.requestStandingsDataWaiting());
    },
  getMonthsList:
    () => {
      Helper.myFetch(
        '/api/userMonth',
        'GET',
        {},
        (response => {
          const months = response.userMonthArray.map(userMonth => userMonth.month)

          //always include the current month, even if user hasn't created a userMonth yet:
          months
            .push(moment().format('YYYY-MM'))
          const uniqMonths = _.uniqBy(months)

          //sort reverse-chronologically:
          uniqMonths
            .sort()
            .reverse();
          dispatch(ActionCreator.receiveMonthList(uniqMonths));
        }),
        (response => {
          dispatch(ActionCreator.requestMonthListFailure());
          Alert.warning('Error: Failed to load list of user\'s months. ' + response.message,
            {
              position: 'bottom',
              effect: 'stackslide',
              beep: false,
              timeout: 8000,
              offset: 0
            }
          );
        })
      );
      dispatch(ActionCreator.requestMonthListWaiting());
    }
});

const StandingsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(StandingsTable);

export default StandingsContainer;