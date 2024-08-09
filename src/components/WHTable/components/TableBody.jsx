import React, { Fragment } from 'react';
import Index from './Index';
import CellForKey from './CellForKey';
import ActionDropDownMenu from './ActionDropDownMenu';

const getObjectKeysWithoutId = (data) => Object.entries(data).filter(([key]) => key !== '_id');

const TableRow = ({ children, secondary }) => (
  <tr className={`wh-table-container__table-row ${secondary ? 'added-padding' : ''}`}>
    {children}
  </tr>
);

const renderRecursiveRows = (
  data,
  columns,
  currentPage,
  elementsPerPage,
  actions,
  actionsDisabled,
  parentIndex,
  depthLevel = 1,
) => data.map((row, index) => {
  const id = row?._id || row?.id || 'no id';
  const keyForRow = `${index.toString()} row ${id}`;
  const rowKeys = getObjectKeysWithoutId(row);
  const hasChildrenRows = row?.children && row.children.length;

  const paddingLeft = `${(depthLevel || 1) * 11}px`;

  const indexForRow = (elementsPerPage * (currentPage - 1)) + index + 1;
  const parentRowIndex = parentIndex ? `${parentIndex}.${index + 1}` : `${indexForRow}`;

  return (
    <Fragment key={`${keyForRow} 1`}>
      <TableRow key={keyForRow}>
        <Index visible index={parentRowIndex} paddingLeft={paddingLeft} />
        {rowKeys.map(([key, cell], i) => {
          const rowCellsKey = `${key} ${i} column ${id}`;

          return <CellForKey name={key} content={cell} key={rowCellsKey} id={id} />;
        })}
        <ActionDropDownMenu actions={actions} id={id} disabled={actionsDisabled} />
      </TableRow>
      {hasChildrenRows ? renderRecursiveRows(
        row.children,
        columns,
        currentPage,
        elementsPerPage,
        actions,
        actionsDisabled,
        parentRowIndex,
        depthLevel + 1,
      ) : null}
    </Fragment>
  );
});

const TableBody = ({
  data,
  actions,
  columns,
  secondary,
  currentPage,
  elementsPerPage,
  actionsDisabled,
}) => {
  if (!data?.length) {
    return (
      <tbody>
        <tr className={`wh-table-container__table-row ${secondary ? 'added-padding' : ''}`}>
          <td className="wh-text-small text-center" colSpan={columns + 2}>
            Nav ierakstu
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {renderRecursiveRows(
        data,
        columns,
        currentPage,
        elementsPerPage,
        actions,
        actionsDisabled,
      )}
    </tbody>
  );
};

export default TableBody;
