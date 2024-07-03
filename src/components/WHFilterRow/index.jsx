import React, { useEffect, useState } from 'react';
import './styles.scss';
import '../../styles.scss';

const WHFilterRow = ({
  visible = true,
  children,
  className = '',
}) => {
  const [overflowDisabled, setOverflowDisabled] = useState(false);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        setOverflowDisabled(true);
      }, 200);

      return () => clearTimeout(timer);
    }

    setOverflowDisabled(false);
  }, [visible]);

  return (
    <div className={`wh-filter-row ${visible ? 'row-visible' : 'row-not-visible'} ${overflowDisabled ? 'overflow-disabled' : ''} ${className}`}>
      {children}
    </div>
  );
};

export default WHFilterRow;
