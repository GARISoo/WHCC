import React, { useEffect } from 'react';
import './styles.scss';
import '../../styles.scss';

const WHStatusMessage = ({
  absolute = false,
  status,
  message,
  className = '',
  resetTime = 0,
  handleReset = () => {},

}) => {
  if (!status || !message) {
    return null;
  }

  useEffect(() => {
    if (resetTime) {
      const timer = setTimeout(() => {
        handleReset();
      }, resetTime);

      return () => clearTimeout(timer);
    }
  }, [resetTime, handleReset]);

  return (
    <div className={`wh-status-message wh-bg-light wh-status-${status} ${className} ${absolute ? 'wh-status-message-absolute' : ''}`}>
      <p className={`wh-text-small fw-600 wh-status-${status}-text`}>
        {message}
      </p>
    </div>
  );
};

export default WHStatusMessage;
