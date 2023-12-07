import React from 'react';

const SelectedValue = ({ value }) => {
  const nothingSelected = !value;

  if (nothingSelected) {
    return (
      <span className="wh-time-picker-value">HH:mm</span>
    );
  }

  return (
    <div className="wh-time-picker-value">{value}</div>
  );
};

export default SelectedValue;
