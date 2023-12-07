import React from 'react';
import { Redirect } from 'react-router-dom';
import WHStatusMessage from '../WHStatusMessage';
import WHLoader from '../WHLoader';
import './styles.scss';
import '../../styles.scss';

const WHFormContainer = ({
  children,
  status,
  message,
  access = true,
  onSubmit,
  id,
  loading,
  className = '',
}) => {
  if (loading) {
    return (
      <div className="wh-form-loader-container">
        <WHLoader className="pt-4" />
      </div>
    );
  }

  if (!access) {
    return <Redirect to="/unauthorized" />;
  }

  return (
    <form className={`wh-form-container ${className}`} onSubmit={onSubmit} id={id} autoComplete="off" noValidate>
      <WHStatusMessage status={status} message={message} />
      {children}
    </form>
  );
};

export default WHFormContainer;
