import React from 'react';
import './styles.scss';
import '../../styles.scss';

const WHRemoveButton = ({
  disabled,
  onClick,
  visible = true,
  className = '',
}) => {
  if (!visible) {
    return null;
  }

  return (
    <button className={`wh-remove-btn align-self-center mt-1 ${className}`} type="button" onClick={onClick} disabled={disabled}>
      <i
        className="fa-regular fa-circle-x fa-xl align-self-center"
        style={{ color: disabled ? '#A8A8A8' : '#EC1C24' }}
      />
    </button>
  );
};

export default WHRemoveButton;
