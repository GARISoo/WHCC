import React from 'react';
import { NavLink } from 'react-router-dom';
import './styles.scss';
import '../../styles.scss';

const WHAdd = ({
  disabled,
  visible = true,
  onClick,
  text,
  to = '',
  className = '',
}) => {
  if (!visible) {
    return null;
  }

  if (disabled || !to) {
    return (
      <button className={`wh-add-btn align-self-center mt-2 gapx-1 ${className}`} type="button" onClick={onClick} disabled={disabled}>
        <i
          className="fa-solid fa-plus fa-xl text-center"
          style={{ color: disabled ? '#A8A8A8' : '#4D4D4D' }}
        />
        {text ? <span className="wh-text-small">{text}</span> : null}
      </button>
    );
  }

  return (
    <NavLink className={`wh-add-btn align-self-center mt-2 gapx-1 ${className}`} to={to}>
      <i
        className="fa-solid fa-plus fa-xl text-center"
        style={{ color: disabled ? '#A8A8A8' : '#4D4D4D' }}
      />
      {text ? <span className="wh-text-small">{text}</span> : null}
    </NavLink>
  );
};

export default WHAdd;
