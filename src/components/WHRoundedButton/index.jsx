import React from 'react';
import './styles.scss';
import '../../styles.scss';

const WHRoundedButton = ({
  children,
  onClick,
  active,
  className = '',
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`wh-rounded-button ${active ? 'wh-rounded-button-active' : ''} wh-text-small ${className}`}
  >
    {children}
  </button>
);

export default WHRoundedButton;
