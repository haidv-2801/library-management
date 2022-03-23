import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { PAGEGING } from '../../../constants/commonConstant';
import { Paginator as PaginatorPrime } from 'primereact/paginator';
import { buildClass } from '../../../constants/commonFunction';
import './paginator.scss';

Paginator.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  pageSize: PropTypes.oneOf(PAGEGING),
  page: PropTypes.number,
  totalRecords: PropTypes.number,
  onChange: PropTypes.func,
};

Paginator.defaultProps = {
  id: '',
  className: '',
  style: {},
  pageSize: 10,
  page: 1,
  totalRecords: 0,
  onChange: () => {},
};

function Paginator(props) {
  const { id, style, className, pageSize, page, totalRecords, onChange } =
    props;

  return (
    <PaginatorPrime
      style={style}
      className={buildClass(['toe-paginator', 'toe-font-body', className])}
      first={(page - 1) * pageSize}
      rows={pageSize}
      totalRecords={Math.max(0, totalRecords)}
      rowsPerPageOptions={PAGEGING}
      onPageChange={(data) => {
        onChange({ page: data.page + 1, pageSize: data.rows });
      }}
    />
  );
}

export default Paginator;
