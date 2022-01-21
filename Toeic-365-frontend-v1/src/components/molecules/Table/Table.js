import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { buildClass } from '../../../constants/commonFunction';
import './table.scss';

Table.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  columns: PropTypes.array,
  data: PropTypes.array,
  configs: PropTypes.object,
  isLoading: PropTypes.bool,
};

Table.defaultProps = {
  id: '',
  className: '',
  style: {},
  columns: [],
  data: [],
  configs: {},
  isLoading: false,
};

function Table(props) {
  const { id, style, className, columns, data, configs, isLoading } = props;

  const renderColums = () => {
    return columns?.map((col, _) => {
      return (
        <Column
          {...col}
          key={col.field}
          maxConstraints={300}
          className="toe-font-label toe-table__th"
        />
      );
    });
  };

  const paginatorLeft = (
    <Button
      type="button"
      icon="pi pi-refresh"
      className="p-button-text toe-refresh-button"
      style={{ width: 30, height: 30 }}
    />
  );
  const paginatorRight = (
    <Button type="button" icon="pi pi-cloud" className="p-button-text" />
  );

  return (
    <div
      id={id}
      style={style}
      className={buildClass(['toe-table', 'toe-font-body', className])}
    >
      <div className="card">
        <DataTable
          {...configs}
          value={data}
          rowHover
          responsiveLayout="scroll"
          paginator
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          currentPageReportTemplate="Hiển thị {first}-{last}/{totalRecords} bản ghi"
          paginatorClassName="toe-font-label toe-pagination"
          rowsPerPageOptions={[10, 20, 50]}
        >
          {renderColums()}
        </DataTable>
      </div>
    </div>
  );
}

export default Table;
