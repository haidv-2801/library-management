import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { InputText } from 'primereact/inputtext';
import { buildClass } from '../../../../constants/commonFunction';
import { format } from 'react-string-format';
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
  maxLength: PropTypes.any,
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
  maxLength: undefined,
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
    maxLength,
  } = props;

  const ref = useRef('');

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
          onChange={(e) => {
            ref.current = e.target.value;
            onChange(e);
            if (ref.current.length === parseInt(maxLength, 10) || 0) return;
          }}
          placeholder={placeholder}
          maxLength={maxLength}
        />
        {maxLength ? (
          <span className="toe-font-hint toe-input-maxlength">
            {format('{0}/{1}', ref.current.length || 0, maxLength)}
          </span>
        ) : null}
      </div>
      {bottomMessage && !valid && (
        <div className="toe-input-message">{bottomMessage}</div>
      )}
    </>
  );
}

export default Input;
