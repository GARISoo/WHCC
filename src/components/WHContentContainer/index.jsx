import React from 'react';
import { Redirect } from 'react-router-dom';
import WHStatusMessage from '../WHStatusMessage';
import './styles.scss';
import '../../styles.scss';

const WHContentContainer = ({
  children,
  status,
  message,
  access = true,
  className = '',
}) => {
  if (!access) {
    return <Redirect to="/unauthorized" />;
  }

  return (
    <div className={`wh-content-container ${className}`}>
      <WHStatusMessage status={status} message={message} />
      {children}
    </div>
  );
};

export default WHContentContainer;
