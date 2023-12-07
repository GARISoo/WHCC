import React from 'react';
import moment from 'moment';
import isDateValidFormat from '../helpers/isDateValidFormat';

const SelectedValue = ({ value, dateFormat }) => {
  const validFormat = isDateValidFormat(value, dateFormat);

  if (!validFormat) {
    return (
      <span className="wh-date-picker-value wh-text-red">ERROR</span>
    );
  }

  const nothingSelected = !value || (value && !value.length);

  if (nothingSelected) {
    return (
      <span className="wh-date-picker-value">{dateFormat}</span>
    );
  }

  const isArray = Array.isArray(value);

  if (isArray) {
    const sortedValues = value.sort((a, b) => {
      const dateA = moment(a, dateFormat);
      const dateB = moment(b, dateFormat);

      if (dateA.isBefore(dateB)) {
        return -1;
      } if (dateA.isAfter(dateB)) {
        return 1;
      }

      return 0;
    });

    const selectedMultiple = sortedValues.length > 1;

    if (selectedMultiple) {
      return (
        <div className="wh-date-picker-value-multiple">
          <span className="wh-date-picker-value">{sortedValues[0]}</span>
          <span className="wh-date-picker-bubble">{`+${sortedValues.length - 1}...`}</span>
        </div>
      );
    }

    return (
      <span className="wh-date-picker-value">{sortedValues[0]}</span>
    );
  }

  return (
    <div className="wh-date-picker-value">{value}</div>
  );
};

export default SelectedValue;
