import React from 'react';

const sortArrows = [
  {
    direction: 'asc',
    icon: 'fa-solid fa-chevron-up',
  },
  {
    direction: 'desc',
    icon: 'fa-solid fa-chevron-down',
  },
];

const SortArrows = ({
  visible,
  activeSort,
  handleSort,
  columnIndex,
}) => {
  if (!visible) {
    return null;
  }

  return (
    <div className="wh-table-sort-box">
      {sortArrows.map(({ direction, icon }) => {
        const active = activeSort?.index === columnIndex && activeSort?.direction === direction;
        const activeClassName = active ? 'sort-box-btn-active' : '';

        return (
          <button
            key={`${columnIndex.toString()} ${direction}`}
            type="button"
            className={`wh-table-sort-box-btn ${activeClassName}`}
            onClick={() => handleSort(columnIndex, direction)}
          >
            <i className={icon} />
          </button>
        );
      })}
    </div>
  );
};

export default SortArrows;
