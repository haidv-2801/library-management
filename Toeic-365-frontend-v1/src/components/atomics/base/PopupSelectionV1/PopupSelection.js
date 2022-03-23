import React, { Children, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  BUTTON_THEME,
  BUTTON_TYPE,
} from '../../../../constants/commonConstant';
import { buildClass } from '../../../../constants/commonFunction';
import './popupSelection.scss';
import { Popover } from 'antd';

PopupSelection.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  wrapperClassName: PropTypes.string,
  style: PropTypes.object,
  options: PropTypes.array,
  onChange: PropTypes.func,
  defaultValue: PropTypes.any,
  clickTargetElementRef: PropTypes.any,
  trigger: PropTypes.string,
  placement: PropTypes.string,
};

PopupSelection.defaultProps = {
  id: '',
  className: '',
  wrapperClassName: '',
  style: {},
  options: [],
  onChange: () => {},
  trigger: 'click',
  placement: 'bottomRight',
};

function PopupSelection(props) {
  const {
    id,
    style,
    className,
    options,
    defaultValue,
    onChange,
    wrapperClassName,
    trigger,
    placement,
  } = props;

  const renderOption = () => {
    return (
      <div
        id={id}
        style={style}
        className={buildClass(['toe-popup-selection'], className)}
      >
        {options.map((item) => {
          if (item?.isHide) return null;
          return (
            <div
              key={item?.value}
              className={buildClass([
                'toe-popup-selection__item',
                'toe-font-body',
                defaultValue === item?.value &&
                  'toe-popup-selection__item--selected',
              ])}
              onClick={() => onChange(item)}
            >
              {item?.label}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <Popover
      overlayClassName="toe-popup-selection__wrapper"
      className={buildClass(['toe-popup-selection__wrapper', wrapperClassName])}
      placement={placement}
      content={renderOption()}
      trigger={trigger}
    >
      {props.children}
    </Popover>
  );
}

export default PopupSelection;
