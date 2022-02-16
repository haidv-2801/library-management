import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import {
  BUTTON_THEME,
  BUTTON_TYPE,
} from '../../../../constants/commonConstant';
import { buildClass } from '../../../../constants/commonFunction';
import './popupSelection.scss';
import useOnClickOutside from '../../../../hooks/useClickOutSide';

PopupSelection.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  options: PropTypes.array,
  onChange: PropTypes.func,
  onClose: PropTypes.func,
  defaultValue: PropTypes.any,
  ref: PropTypes.any,
};

PopupSelection.defaultProps = {
  id: '',
  className: '',
  style: {},
  options: [],
  onChange: () => {},
  onClose: () => {},
  defaultValue: null,
  ref: null,
};

function PopupSelection(props) {
  const { id, style, className, options, defaultValue, onChange, onClose } =
    props;
  const ref = useRef();
  useOnClickOutside(ref, onClose);
  return (
    <div
      id={id}
      style={style}
      className={buildClass(['toe-popup-selection', className])}
      ref={ref}
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
}

export default PopupSelection;
