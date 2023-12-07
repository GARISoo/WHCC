/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import WHContentContainer from '../../WHContentContainer';
import WHModalContainer from '../../WHModalContainer';
import WHButton from '../../WHButton';
import WHTable from '../../WHTable';
import WHInput from '../../WHInput';

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
      <h3 className="padd-bot-4 mobile-center">
        {title}
      </h3>
    ) : null}
    {createProps ? (
      <WHButton
        {...createProps}
        text="Pievienot"
        icon="fa-solid fa-plus"
        className="mobile-center"
        type="link"
        outline
        small
        right
      />
    ) : null}
    {filterProps ? (
      <form className="d-flex justify-content-start align-items-end gapx-2" onSubmit={filterProps?.handleSubmit}>
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
          outline
          secondary
          type="submit"
          text="Meklēt"
          disabled={filterProps?.disabled}
        />
      </form>
    ) : null}
    {children || null}
    <WHTable {...tableProps} />
  </WHContentContainer>
);

export default TableView;
