import PropTypes from 'prop-types';
import React from 'react';
import { buildClass } from '../../../constants/commonFunction';
import './toastConfirmDelete.scss';

ToastConfirmDelete.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  onChange: PropTypes.func,
  defaultValue: PropTypes.any,
};

ToastConfirmDelete.defaultProps = {
  id: '',
  className: '',
  style: {},
  onChange: () => {},
  defaultValue: null,
};

function ToastConfirmDelete(props) {
  const { id, style, className, onChange } = props;

  return (
    <div
      id={id}
      style={style}
      className={buildClass(['toe-upload toe-font-body', className])}
    ></div>
  );
}

export default ToastConfirmDelete;
