import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { InputText } from 'primereact/inputtext';
import { buildClass } from '../../../../constants/commonFunction';
import { format } from 'react-string-format';
import { debounce } from 'debounce';
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
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  maxLength: PropTypes.any,
  defaultValue: PropTypes.any,
  value: PropTypes.any,
  tabIndex: PropTypes.number,
  showMaxLength: PropTypes.bool,
  controlled: PropTypes.bool,
  type: PropTypes.oneOf(['input', 'textarea']),
  leftIcon: PropTypes.any,
  delay: PropTypes.number,
  delayAction: PropTypes.func,
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
  disabled: false,
  controlled: false,
  hasRequiredLabel: false,
  onChange: () => {},
  delayAction: () => {},
  maxLength: undefined,
  defaultValue: '',
  value: '',
  tabIndex: 0,
  showMaxLength: false,
  type: 'input',
  leftIcon: '',
  delay: 0,
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
    disabled,
    value,
    tabIndex,
    defaultValue,
    showMaxLength,
    type,
    leftIcon,
    delay,
    delayAction,
    controlled,
  } = props;

  const ref = useRef('');
  const [delayValue, setDelayValue] = useState(defaultValue);

  useEffect(() => {
    let timeOutId = null;
    if (delay > 0) {
      timeOutId = setTimeout(() => {
        onChange(delayValue);
      }, delay);
    } else {
      onChange(delayValue);
    }
    return () => {
      if (timeOutId) clearTimeout(timeOutId);
    };
  }, [delayValue]);

  const valueProp = controlled
    ? { value: value }
    : { defaultValue: delayValue };

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

        <div
          style={{ width: '100%' }}
          className={buildClass([leftIcon && 'p-input-icon-left'])}
        >
          {leftIcon ? leftIcon : null}
          <InputText
            autoFocus={autoFocus}
            onChange={(e) => {
              ref.current = e.target.value;
              setDelayValue(e.target.value);
              if (ref.current.length === parseInt(maxLength, 10) || 0) return;
            }}
            placeholder={placeholder}
            maxLength={maxLength}
            {...valueProp}
            tabIndex={tabIndex}
            disabled={disabled}
            leficon
          />
        </div>
        {showMaxLength ? (
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
