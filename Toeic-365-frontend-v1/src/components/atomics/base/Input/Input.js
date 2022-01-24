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
};

Input.defaultProps = {
  id: '',
  className: '',
  style: {},
  valid: true,
  bottomMessage: null,
  placeholder: 'Nhập thông tin',
  rightIcon: null,
};

function Input(props) {
  const { id, style, className, valid, bottomMessage, placeholder, rightIcon } =
    props;

  return (
    <>
      <div
        id={id}
        style={style}
        className={buildClass([
          'toe-input',
          !valid && 'toe-input-warning',
          rightIcon && 'p-input-icon-right',
          className,
          'toe-font-body',
        ])}
      >
        {rightIcon}
        <InputText placeholder={placeholder} />
      </div>
      {bottomMessage && !valid && (
        <div className="toe-input-message">{bottomMessage}</div>
      )}
    </>
  );
}

export default Input;
