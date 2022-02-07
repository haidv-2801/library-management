import React from 'react';
import PropTypes from 'prop-types';
import { InputText } from 'primereact/inputtext';
import { buildClass } from '../../../../constants/commonFunction';
import './input.scss';

Input.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  valid: PropTypes.bool,
  bottomMessage: PropTypes.string,
  placeholder: PropTypes.any,
  rightIcon: PropTypes.any,
  label: PropTypes.any,
  autoFocus: PropTypes.bool,
  hasRequiredLabel: PropTypes.bool,
  onChange: PropTypes.func,
};

Input.defaultProps = {
  id: '',
  className: '',
  style: {},
  valid: true,
  bottomMessage: null,
  placeholder: 'Nhập thông tin',
  rightIcon: null,
  label: null,
  autoFocus: false,
  hasRequiredLabel: false,
  onChange: () => {},
};

function Input(props) {
  const {
    id,
    style,
    className,
    valid,
    bottomMessage,
    placeholder,
    rightIcon,
    label,
    onChange,
    autoFocus,
    hasRequiredLabel,
  } = props;

  return (
    <>
      <div
        id={id}
        style={style}
        className={buildClass([
          'toe-input',
          !valid && 'toe-input-warning',
          rightIcon && 'p-input-icon-right',
          label && 'toe-input-has-label',
          className,
          'toe-font-body',
        ])}
      >
        {rightIcon}
        {label ? (
          <label
            className={buildClass([
              'toe-input-label toe-font-label',
              hasRequiredLabel && 'toe-input-label--required',
            ])}
          >
            {label}
            {hasRequiredLabel ? <span style={{ color: 'red' }}>*</span> : null}
          </label>
        ) : null}

        <InputText
          autoFocus={autoFocus}
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>
      {bottomMessage && !valid && (
        <div className="toe-input-message">{bottomMessage}</div>
      )}
    </>
  );
}

export default Input;
