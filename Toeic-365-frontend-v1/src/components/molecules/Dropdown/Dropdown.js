import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Dropdown as DropdownPrime } from 'primereact/dropdown';
import { buildClass } from '../../../constants/commonFunction';
import './dropdown.scss';

Dropdown.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  options: PropTypes.array,
  configs: PropTypes.object,
  isLoading: PropTypes.bool,
  defaultValue: PropTypes.any,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  filter: PropTypes.func,
  onChange: PropTypes.func,
};

Dropdown.defaultProps = {
  id: '',
  className: '',
  style: {},
  options: [],
  configs: {},
  isLoading: false,
  defaultValue: null,
  placeholder: 'Nhấp để chọn',
  disabled: false,
  filter: false,
  onChange: () => {},
};

function Dropdown(props) {
  const {
    id,
    style,
    className,
    options,
    defaultValue,
    placeholder,
    disabled,
    onChange,
    filter,
  } = props;

  return (
    <DropdownPrime
      id={id}
      style={style}
      panelClassName="toe-font-body"
      className={buildClass(['toe-dropdown', 'toe-font-body', className])}
      value={defaultValue}
      options={options}
      onChange={onChange}
      optionLabel="label"
      optionValue="value"
      placeholder={placeholder}
      disabled={disabled}
      emptyFilterMessage="Không tìm thấy dữ liệu"
      emptyMessage="Không có dữ liệu hiển thị"
      dataKey="value"
      filter={filter}
      filterInputAutoFocus
      resetFilterOnHide
      filterPlaceholder="Nhập từ cần tìm"
    />
  );
}

export default Dropdown;
