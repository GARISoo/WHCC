/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import WHContentContainer from '../../WHContentContainer';
import WHModalContainer from '../../WHModalContainer';
import WHButton from '../../WHButton';
import WHTable from '../../WHTable';
import WHInput from '../../WHInput';
import './styles.scss';

// const containerProps = {
//   status: '',
//   message: '',
//   access: false,
//   loading: false,
// };

// const modalProps = {
//   modalDetails: null,
//   confirmModal: () => {},
//   closeModal: () => {},
// };

// const createProps = {
//   visible: false,
//   disabled: false,
//   to: '',
// };

// const tableProps = {
//   rowData: [],
//   columnTitles: [''],
//   elementsPerPage: 10,
//   actions: [],
//   loading: false,
//   sort: true,
// };

// const filterProps = {
//   value: '',
//   name: 'substring',
//   disabled: false,
//   handleChange: () => {},
//   handleSubmit: () => {},
// };

const TableView = ({
  title,
  children,
  tableProps,
  modalProps,
  createProps,
  filterProps,
  containerProps,
}) => (
  <WHContentContainer {...containerProps}>
    {modalProps ? (
      <WHModalContainer {...modalProps} />
    ) : null}
    {title ? (
      <h3 className="padd-bot-2 mobile-center">
        {title}
      </h3>
    ) : null}
    {filterProps ? (
      <div className="d-flex w-100 table-view-filters">
        <form className="d-flex w-100 justify-content-start align-items-end" onSubmit={filterProps?.handleSubmit}>
          <WHInput
            value={filterProps?.value}
            onChange={filterProps?.handleChange}
            name={filterProps?.name}
            placeholder="Ievadīt"
            label="Meklēšanas kritērijs"
            icon="fa-solid fa-search"
            disabled={filterProps?.disabled}
            handleClear={filterProps?.handleClear}
          />
          <WHButton
            small
            secondary
            outline
            type="submit"
            text="Meklēt"
            icon="fas fa-search search-prop"
            disabled={filterProps?.disabled}
            className="ms-1"
          />
        </form>
        {createProps ? (
          <WHButton
            {...createProps}
            icon="fa-solid fa-plus"
            text="Pievienot"
            className="ms-2 create-add-prop"
            type="link"
            small
            right
          />
        ) : null}
      </div>
    ) : null}
    {children || null}
    <WHTable {...tableProps} />
  </WHContentContainer>
);

export default TableView;
