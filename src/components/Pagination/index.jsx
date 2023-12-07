import React from 'react';
import './styles.scss';
import '../../styles.scss';

const Pagination = ({
  currentPage,
  totalPages,
  handleNewPage,
  visible = true,
}) => {
  if (!visible) {
    return null;
  }

  const handlePreviousPage = () => {
    const newPageNumber = currentPage - 1;

    handleNewPage(newPageNumber);
  };

  const handleNextPage = () => {
    const newPageNumber = currentPage + 1;

    handleNewPage(newPageNumber);
  };

  const handleCustomPage = (page) => {
    const newPageNumber = Number(page);

    handleNewPage(newPageNumber);
  };

  return (
    <div className="wh-pagination-container">
      <ul className="wh-pagination">
        <li className={currentPage === 1 ? 'wh-page-item disabled' : 'wh-page-item'}>
          <button
            type="button"
            onClick={handlePreviousPage}
            className="wh-page-link wh-arrow-page-link"
            disabled={currentPage === 1}
          >
            <i className="fa fa-angle-left" />
          </button>
        </li>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNr) => {
          if (pageNr <= currentPage + 3 && pageNr >= currentPage - 3) {
            return (
              <li key={`${pageNr} ${pageNr}`} className={currentPage === pageNr ? 'wh-page-item active' : 'wh-page-item'}>
                <button
                  type="button"
                  onClick={(e) => handleCustomPage(e.target.value)}
                  value={pageNr}
                  className="wh-page-link"
                  disabled={currentPage === pageNr}
                >
                  {pageNr}
                </button>
              </li>
            );
          }

          return null;
        }).filter((user) => user)}
        <li className={currentPage === totalPages ? 'wh-page-item disabled' : 'wh-page-item'}>
          <button
            type="button"
            onClick={handleNextPage}
            className="wh-page-link wh-arrow-page-link"
            disabled={currentPage === totalPages}
          >
            <i className="fa fa-angle-right" />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
