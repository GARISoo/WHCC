import React from 'react';
import './styles.scss';
import '../../styles.scss';

const WHCustomNavbar = ({ sections, activeSection, handleChange }) => {
  if (!sections.length) {
    return null;
  }

  return (
    <div className="wh-custom-navbar-container flex-scroll-x">
      {sections?.map((section) => {
        const isActive = activeSection === section;

        return (
          <button
            type="button"
            onClick={() => handleChange(section)}
            className={`wh-custom-navbar-container-btn ${isActive ? 'navbar-link-active' : ''}`}
            key={section}
          >
            {section}
          </button>
        );
      })}
    </div>
  );
};

export default WHCustomNavbar;
