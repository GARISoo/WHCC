/* eslint-disable react/button-has-type */
import React from 'react';
import { NavLink } from 'react-router-dom';
import WHLoader from '../WHLoader';
import './styles.scss';
import '../../styles.scss';

const Icon = ({
  icon, outline, secondary, visible,
}) => {
  if (!icon) {
    return null;
  }

  const className = `${icon} ${outline ? (secondary ? 'wh-text-dark' : 'wh-text-red') : 'wh-text-light'} btn-icon ${!visible ? 'dummy-width' : ''}`;

  return (
    <i className={className} />
  );
};

const Text = ({
  text, small, outline, secondary, visible,
}) => {
  if (!text) {
    return null;
  }

  const className = `${outline ? (secondary ? 'wh-text-dark' : 'wh-text-red') : 'wh-text-light'} ${!visible ? 'dummy-width' : ''}`;

  if (small) {
    return (
      <span className={className}>{text}</span>
    );
  }

  return (
    <h4 className={className}>{text}</h4>
  );
};

const WHButton = ({
  text,
  icon,
  onClick,
  secondary,
  outline,
  small,
  type = 'button',
  right,
  left,
  center,
  success,
  disabled,
  to,
  visible = true,
  loading,
  className = '',
}) => {
  if (!visible) {
    return null;
  }

  const alignment = right ? 'flex-end' : (left ? 'flex-start' : (center ? 'center' : ''));
  const isDisabled = loading || disabled;

  if (loading) {
    return (
      <div
        className={
          `wh-btn-redesign ${small ? 'small' : ''} 
        ${outline ? `wh-bg-transparent ${secondary ? 'border-dark' : 'border-red'}` : (secondary ? 'wh-bg-dark border-dark' : 'wh-bg-red border-red')}
        ${text ? '' : 'no-text-padding'} ${className}
        ${isDisabled ? 'wh-btn-disabled' : ''}`
        }
        style={{ alignSelf: alignment }}
      >
        <WHLoader size={0.4} white={!secondary} />
      </div>
    );
  }

  if (type === 'link') {
    return (
      <NavLink
        to={to}
        style={{ alignSelf: alignment }}
        disabled={isDisabled}
        className={
          `wh-btn-redesign ${small ? 'small' : ''} 
          ${outline ? `wh-bg-transparent ${secondary ? 'border-dark' : 'border-red'}` : (secondary ? 'wh-bg-dark border-dark' : 'wh-bg-red border-red')} 
          ${text ? '' : 'no-text-padding'} ${className}
          ${isDisabled ? 'wh-btn-disabled' : ''}`
        }
      >
        <Icon icon={icon} outline={outline} secondary={secondary} />
        <Text text={text} small={small} outline={outline} secondary={secondary} />
      </NavLink>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      style={{ alignSelf: alignment }}
      disabled={isDisabled}
      className={
        `wh-btn-redesign ${small ? 'small' : ''} 
        ${outline ? `wh-bg-transparent ${secondary ? 'border-dark' : 'border-red'}` : (secondary ? 'wh-bg-dark border-dark' : 'wh-bg-red border-red')}
        ${text ? '' : 'no-text-padding'}
        ${className}`
      }
    >
      <Icon icon={icon} outline={outline} secondary={secondary} />
      <Text text={text} small={small} outline={outline} secondary={secondary} />
    </button>
  );
};

export default WHButton;
