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
  hasSubLabel: PropTypes.bool,
  showClear: PropTypes.bool,
  itemTemplate: PropTypes.any,
  filter: PropTypes.bool,
  onChange: PropTypes.func,
};

Dropdown.defaultProps = {
  id: '',
  className: '',
  style: {},
  options: [],
  configs: {},
  isLoading: false,
  showClear: false,
  defaultValue: null,
  placeholder: 'Nhấp để chọn',
  disabled: false,
  filter: false,
  itemTemplate: () => null,
  hasSubLabel: false,
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
    itemTemplate,
    showClear,
    hasSubLabel,
  } = props;

  const customItemTemplate = ({ label, value, subLabel = null }) => {
    if (!hasSubLabel) return label;
    return (
      <div className="p-dropdown-item__wrapper">
        <div className="p-dropdown-item__label">{label}</div>
        <div className="p-dropdown-item__subLabel toe-font-hint">
          {subLabel}
        </div>
      </div>
    );
  };

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
      showClear={showClear}
      itemTemplate={customItemTemplate}
    />
  );
}

export default Dropdown;
