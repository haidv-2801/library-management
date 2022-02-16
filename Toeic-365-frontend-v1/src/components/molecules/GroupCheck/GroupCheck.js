import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { buildClass } from '../../../constants/commonFunction';
import { CHECKBOX_TYPE } from '../../../constants/commonConstant';
import { RadioButton } from 'primereact/radiobutton';
import { Radio } from 'antd';
import './groupCheck.scss';

GroupCheck.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  options: PropTypes.arrayOf({
    label: PropTypes.any,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  defaultValue: PropTypes.any,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf([CHECKBOX_TYPE.CIRCLE, CHECKBOX_TYPE.SQUARE]),
  onChange: PropTypes.func,
};

GroupCheck.defaultProps = {
  id: '',
  className: '',
  style: {},
  options: [],
  defaultValue: null,
  disabled: false,
  onChange: () => {},
  type: CHECKBOX_TYPE.CIRCLE,
};

function GroupCheck(props) {
  const {
    id,
    style,
    className,
    options,
    defaultValue,
    disabled,
    onChange,
    type,
  } = props;

  return (
    <div className={buildClass(['toe-group-check', className])}>
      <Radio.Group
        onChange={(e) => {
          onChange(e.target.value);
        }}
        value={defaultValue}
      >
        {options.map((item) => {
          let isHide = false;
          if (typeof item?.onHide === 'function') isHide = item?.onHide(item);
          if (isHide) return null;

          return (
            <div className="toe-group-check__container">
              <div className="toe-group-check__check">
                <Radio value={item.value}>
                  <div className="toe-group-check__label">{item.label}</div>
                </Radio>
              </div>
            </div>
          );
        })}
      </Radio.Group>
    </div>
  );
}

export default GroupCheck;
