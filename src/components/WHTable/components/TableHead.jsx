import React from 'react';
import SortArrows from './SortArrows';

const TableHead = ({
  titles,
  secondary,
  hasActions,
  handleSort,
  activeSort,
  sortEnabled,
}) => (
  <thead className="wh-table-container__table-head">
    <tr className={`wh-table-container__table-row ${secondary ? 'added-padding' : ''}`}>
      {!secondary ? (
        <th className="wh-table-container__table-th wh-text-small wh-text-gray">#</th>
      ) : null}
      {titles?.map((title, index) => {
        const sortVisible = title && sortEnabled;

        return (
          <th
            className="wh-table-container__table-th"
            key={`${index.toString()} title`}
          >
            <div className="wh-table-container__table-th-container">
              <span className="wh-text-small wh-text-gray">{title}</span>
              <SortArrows
                visible={sortVisible}
                handleSort={handleSort}
                activeSort={activeSort}
                columnIndex={index}
              />
            </div>
          </th>
        );
      })}
      {hasActions ? <th> </th> : null}
    </tr>
  </thead>
);

export default TableHead;
