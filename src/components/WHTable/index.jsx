import React, { useState, useEffect } from 'react';
import TableBody from './components/TableBody';
import TableHead from './components/TableHead';
import Pagination from '../Pagination';
import WHLoader from '../WHLoader';
import '../../styles.scss';
import './styles.scss';

const WHTable = ({
  title,
  columnTitles = [],
  rowData = [],
  actions,
  loading,
  secondary,
  actionsDisabled,
  elementsPerPage = 10,
  customPagination = false,
  customTotalPages,
  customCurrentPage,
  customPageSwitch = () => { },
  sort = true,
  className = '',
}) => {
  if (loading) {
    return (
      <WHLoader />
    );
  }

  const invalidRowData = !Array.isArray(rowData);

  if (invalidRowData) {
    return null;
  }

  const init = customPagination ? rowData : rowData.slice(0, elementsPerPage);

  const [visibleData, setVisibleData] = useState(init);
  const [activeSort, setActiveSort] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = customPagination
    ? customTotalPages : Math.ceil(rowData.length / elementsPerPage);

  const handleNewPage = (page) => {
    if (customPagination) {
      customPageSwitch(page);
      return;
    }

    const to = page * elementsPerPage;
    const from = to - elementsPerPage;
    const filteredData = rowData.slice(from, to);

    setVisibleData(filteredData);
    setCurrentPage(page);
  };

  const compare = (a, b, direction, target) => {
    const valA = a[target];
    const valB = b[target];

    if (direction === 'asc') {
      if (valA < valB) {
        return -1;
      }
      if (valA > valB) {
        return 1;
      }
      return 0;
    }

    if (valB < valA) {
      return -1;
    }

    if (valB > valA) {
      return 1;
    }

    return 0;
  };

  const handleSort = (index, targetDirection) => {
    let direction = targetDirection;

    const needReverseSort = activeSort?.index === index;

    if (needReverseSort) {
      direction = activeSort?.direction === 'asc' ? 'desc' : 'asc';
    }

    const sortObj = {
      index,
      direction,
    };

    const dataContainsIdFields = rowData[0]?._id || rowData[0]?.id;
    const modifiedIndex = dataContainsIdFields ? index + 1 : index;
    const targetKeyName = Object.keys(rowData[0])[modifiedIndex];

    // Use a new array for sorting
    const sortedData = [...rowData].sort((a, b) => compare(a, b, direction, targetKeyName));

    if (sortedData.length) {
      const to = currentPage * elementsPerPage;
      const from = to - elementsPerPage;
      const filteredSortedData = sortedData.slice(from, to);

      setVisibleData(filteredSortedData);
    }

    setActiveSort(sortObj);
  };

  useEffect(() => {
    const initialData = rowData.slice(0, elementsPerPage);
    setVisibleData(initialData);
  }, [rowData, elementsPerPage]);

  return (
    <div className={`${secondary ? 'wh-table-container-secondary' : 'wh-table-container'} ${className}`}>
      {title ? <h3 className="mb-3">{title}</h3> : null}
      <div className="flex-scroll-x">
        <table className="wh-table-container__table">
          <TableHead
            sortEnabled={customPagination ? false : sort}
            titles={columnTitles}
            secondary={secondary}
            activeSort={activeSort}
            handleSort={handleSort}
            hasActions={actions?.length}
          />
          <TableBody
            data={visibleData}
            actions={actions}
            secondary={secondary}
            currentPage={customPagination ? customCurrentPage : currentPage}
            columns={columnTitles.length}
            elementsPerPage={elementsPerPage}
            actionsDisabled={actionsDisabled}
          />
        </table>
        <Pagination
          currentPage={customPagination ? customCurrentPage : currentPage}
          totalPages={customPagination ? customTotalPages : totalPages}
          handleNewPage={handleNewPage}
          visible={!!rowData?.length}
        />
      </div>
    </div>
  );
};

export default WHTable;
