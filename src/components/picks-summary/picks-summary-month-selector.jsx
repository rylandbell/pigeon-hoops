'use strict';

import React from 'react';
import moment from 'moment';

const PicksSummaryMonthSelector = React.createClass({
  handleChange: function(event) {
    this.props.getUserMonthData(event.target.value);
    this.props.setPicksMonth(event.target.value);
  },
  render: function() {
    return (
      <form role="form" className="form">
        <fieldset>
          <div className="form-group standings-month-selector">
            <label className="control-label standings-month-selector__label">Select a month:</label>
            <select className="form-control standings-month-selector__select" onChange={this.handleChange} value={this.props.selectedPicksMonth}>
              <option value={moment().format('YYYY-MM')}>
                {moment().format('MMMM YYYY')}
              </option>
              <option value={moment().add(1,'months').format('YYYY-MM')}>
                {moment().add(1,'months').format('MMMM YYYY')}
              </option>
            </select>
          </div>
        </fieldset>
      </form>
    )
  }
});

export default PicksSummaryMonthSelector;