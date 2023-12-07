/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../../../styles.scss';
import '../styles.scss';

const getFunctionFromObject = (object) => {
  const keys = Object.keys(object);
  let func;

  keys.forEach((key) => {
    if (typeof object[key] === 'function') {
      func = object[key];
    }
  });

  return func;
};

class ActionDropDownMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleMouseEnter() {
    this.setState({ open: true });
  }

  handleMouseLeave() {
    this.setState({ open: false });
  }

  render() {
    const { actions, id, disabled } = this.props;
    const { open } = this.state;

    if (!actions?.length) {
      return null;
    }

    const visibleActions = actions.filter((action) => action);

    if (!visibleActions?.length || !id) {
      return null;
    }

    return (
      <td className="wh-table-td-actions">
        <div className="wh-table-td-actions-wrapper">
          {visibleActions.map((action, ind) => {
            const foundFunction = getFunctionFromObject(action);
            const requiresNavigation = !foundFunction;

            if (requiresNavigation) {
              return (
                <NavLink
                  key={`${ind} ${id}`}
                  className="wh-table-actions-li"
                  to={`${action?.to}/${id}`}
                  title={action?.name}
                >
                  {action?.icon ? <i className={`${action.icon} wh-text-small wh-text-gray wh-action-icon`} /> : null}
                </NavLink>
              );
            }

            return (
              <button
                title={action?.name}
                key={`${ind} ${id}`}
                className="wh-table-actions-li"
                onClick={() => foundFunction(id)}
                type="button"
              >
                {action?.icon ? <i className={`${action.icon} wh-text-small wh-text-gray wh-action-icon`} /> : null}
              </button>
            );
          })}
        </div>
      </td>
    );
  }
}

export default ActionDropDownMenu;
